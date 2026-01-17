# Configuración de Nodemailer

## Variables de Entorno Necesarias

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

### Configuración Básica (SMTP Genérico)
```env
EMAIL_HOST=smtp.tu-proveedor.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@ejemplo.com
EMAIL_PASS=tu-contraseña
EMAIL_FROM=tu-email@ejemplo.com
```

## Configuración por Proveedor

### 1. Gmail (Google)

**IMPORTANTE**: Para usar Gmail necesitas:
1. Habilitar "Verificación en 2 pasos" en tu cuenta de Google
2. Generar una "Contraseña de aplicación" desde: https://myaccount.google.com/apppasswords

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-contraseña-de-aplicación  # NO tu contraseña normal
EMAIL_FROM=tu-email@gmail.com
```

**Alternativa con OAuth2** (más seguro pero más complejo):
- Requiere configuración adicional con tokens OAuth2

### 2. Outlook / Hotmail / Microsoft 365

```env
EMAIL_HOST=smtp-mail.outlook.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@outlook.com
EMAIL_PASS=tu-contraseña
EMAIL_FROM=tu-email@outlook.com
```

### 3. Yahoo Mail

```env
EMAIL_HOST=smtp.mail.yahoo.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@yahoo.com
EMAIL_PASS=tu-contraseña-de-aplicación  # Requiere contraseña de aplicación
EMAIL_FROM=tu-email@yahoo.com
```

### 4. SendGrid (Servicio de Email Transaccional)

```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASS=tu-api-key-de-sendgrid
EMAIL_FROM=tu-email-verificado@ejemplo.com
```

### 5. Mailgun

```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=postmaster@tu-dominio.mailgun.org
EMAIL_PASS=tu-password-de-mailgun
EMAIL_FROM=noreply@tu-dominio.com
```

### 6. Amazon SES (Simple Email Service)

```env
EMAIL_HOST=email-smtp.region.amazonaws.com  # Ej: email-smtp.us-east-1.amazonaws.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-access-key-id
EMAIL_PASS=tu-secret-access-key
EMAIL_FROM=tu-email-verificado@ejemplo.com
```

### 7. Zoho Mail

```env
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@zoho.com
EMAIL_PASS=tu-contraseña
EMAIL_FROM=tu-email@zoho.com
```

## Puertos y Seguridad

- **Puerto 587**: Usa STARTTLS (recomendado para la mayoría)
  - `EMAIL_SECURE=false`
  
- **Puerto 465**: Usa SSL/TLS directamente
  - `EMAIL_SECURE=true`
  - `EMAIL_PORT=465`

- **Puerto 25**: Generalmente bloqueado por ISPs, no recomendado

## Ejemplo de archivo .env completo

```env
# Configuración de Base de Datos
MONGO_URI=mongodb://localhost:27017/tu-base-de-datos

# Configuración de JWT
JWT_SECRET=tu-secreto-super-seguro

# Configuración de Email (Gmail ejemplo)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop
EMAIL_FROM=tu-email@gmail.com
```

## Notas de Seguridad

1. **NUNCA** subas el archivo `.env` a Git (debe estar en `.gitignore`)
2. Usa contraseñas de aplicación para Gmail/Yahoo, no tu contraseña principal
3. En producción, considera usar servicios especializados como SendGrid o Mailgun
4. Para desarrollo local, puedes usar servicios como Mailtrap o Ethereal Email

## Servicios de Prueba (Desarrollo)

### Mailtrap (Recomendado para desarrollo)
```env
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_SECURE=false
EMAIL_USER=tu-usuario-mailtrap
EMAIL_PASS=tu-password-mailtrap
EMAIL_FROM=noreply@ejemplo.com
```

### Ethereal Email (Genera credenciales automáticamente)
- Útil para pruebas rápidas
- Genera credenciales temporales en: https://ethereal.email/
