import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin Abhay',
        email: 'abhayadmin@gmail.com',
        password: bcrypt.hashSync('Abhayrocks1234', 10),
        isAdmin: true
    },
    {
        name: 'Barry Allen',
        email: 'barryallen@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Kawhi Leonard',
        email: 'kawhirocks@gmail.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

export default users;