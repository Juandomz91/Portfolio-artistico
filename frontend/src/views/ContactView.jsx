import { useState } from 'react';

export default function ContactView({ t }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      const body = new FormData();
      body.append('name', form.name);
      body.append('email', form.email);
      body.append('message', form.message);
      if (file) body.append('file', file);

      const res = await fetch('/api/contact', { method: 'POST', body });
      if (!res.ok) throw new Error('request failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ maxWidth: 480 }}>
      <h2 style={{ fontSize: 34, marginBottom: 10 }}>{t.contactTitle}</h2>
      <p className="textbox" style={{ fontSize: 15, marginBottom: 28 }}>{t.contactSubtitle}</p>

      {status === 'sent' ? (
        <div style={{ border: '1px solid var(--color-accent)', borderRadius: 8, padding: 16, color: 'var(--color-accent)', fontSize: 14 }}>
          {t.contactSuccess}
        </div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Field label={t.labelName}>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
          </Field>
          <Field label={t.labelEmail}>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
          </Field>
          <Field label={t.labelMessage}>
            <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} />
          </Field>
          <Field label={t.labelFile}>
            <input type="file" onChange={(e) => { const f = e.target.files[0]; setFile(f || null); setFileName(f ? f.name : ''); }} style={{ ...inputStyle, padding: 6 }} />
            {fileName && <div style={{ fontSize: 12, color: 'var(--color-text-muted)', marginTop: 4 }}>{fileName}</div>}
          </Field>
          {status === 'error' && (
            <div style={{ fontSize: 13, color: '#e0637a' }}>Error al enviar. Inténtalo de nuevo.</div>
          )}
          <button
            type="submit"
            disabled={status === 'sending'}
            style={{
              alignSelf: 'flex-start', color: 'var(--color-accent)', border: '1px solid var(--color-accent)',
              background: 'transparent', borderRadius: 8, padding: '11px 20px', fontSize: 14, cursor: 'pointer'
            }}
          >
            {status === 'sending' ? t.sending : t.submit}
          </button>
        </form>
      )}
    </div>
  );
}

const inputStyle = {
  width: '100%', minHeight: 36, padding: '6px 10px', fontSize: 14, color: 'var(--color-text)',
  background: 'var(--color-surface)', border: '1px solid var(--color-divider)', borderRadius: 8
};

function Field({ label, children }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, marginBottom: 5, color: 'var(--color-text-muted)' }}>{label}</label>
      {children}
    </div>
  );
}
