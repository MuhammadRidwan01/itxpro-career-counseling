-- Update dengan password hash yang benar dari generate-real-hash.js

-- Update admin password (admin123)
UPDATE "users" SET "password" = '$2b$12$VgIecnassS2HouwWLNncmuofBGJEdqY5Xz/ESf5vI9yaU/cVN7QjG' WHERE "email" = 'admin@itxpro.sch.id';

-- Update student password (student123)
UPDATE "users" SET "password" = '$2b$12$ZoUTwxKNPGzB7/.H7RtHvu52MC4BCP5tLlCiL6.ooft6bmTpgAlcm' WHERE "role" = 'STUDENT';

-- Verify the updates
SELECT 
    email, 
    role, 
    CASE 
        WHEN role = 'ADMIN' THEN 'Password: admin123'
        WHEN role = 'STUDENT' THEN 'Password: student123'
    END as password_info
FROM "users" 
ORDER BY role, email;
