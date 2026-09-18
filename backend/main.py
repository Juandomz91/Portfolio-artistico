import re
import uuid
from pathlib import Path

from fastapi import FastAPI, Form, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Cnidari Portfolio API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # ajusta al dominio de producción
    allow_methods=["POST"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path(__file__).parent / "uploads"
UPLOAD_DIR.mkdir(exist_ok=True)

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class ContactResponse(BaseModel):
    ok: bool


@app.post("/api/contact", response_model=ContactResponse)
async def contact(
    name: str = Form(..., min_length=1, max_length=120),
    email: str = Form(...),
    message: str = Form(..., min_length=1, max_length=4000),
    file: UploadFile | None = File(None),
):
    if not EMAIL_RE.match(email):
        raise HTTPException(status_code=422, detail="Email inválido")

    saved_path = None
    if file is not None and file.filename:
        ext = Path(file.filename).suffix
        safe_name = f"{uuid.uuid4().hex}{ext}"
        saved_path = UPLOAD_DIR / safe_name
        content = await file.read()
        if len(content) > 10 * 1024 * 1024:  # 10MB
            raise HTTPException(status_code=413, detail="Archivo demasiado grande")
        saved_path.write_bytes(content)

    # TODO: enviar email real (SMTP / SES / Resend...) con name, email, message y saved_path
    print(f"[contact] {name} <{email}>: {message[:80]}... file={saved_path}")

    return ContactResponse(ok=True)


@app.get("/api/health")
def health():
    return {"status": "ok"}
