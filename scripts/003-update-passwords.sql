-- Update admin password dengan hash yang benar untuk 'admin123'
UPDATE "users" 
SET "password" = '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE "email" = 'admin@itxpro.sch.id';

-- Update semua student password dengan hash yang benar untuk 'student123'
UPDATE "users" 
SET "password" = '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE "role" = 'STUDENT';

-- Verify the updates
SELECT email, role, 
       CASE WHEN password = '$2a$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' 
            THEN 'Password Updated' 
            ELSE 'Old Password' 
       END as password_status
FROM "users";
