import { authenticated } from "../utils/authenticate";
import jwt from 'jsonwebtoken'

describe('Testing authentication', () => {
    beforeEach(() => {
        res.clearCookie('authToken');
        delete window.location;
        window.location = { href: '' };
    });

    test('User is logged in', () => {
        const valid = jwt.sign(
            { userId: "mock", email: "mock@mail.com" },
            "mocksecret",
            { expiresIn: '1h' }
        );
        res.cookie('authToken', valid, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000
          });
        expect(window.location.href).toBe('');
        authenticated();
        expect(window.location.href).toBe('');
    });

    test('User is not logged in', () => {
        authenticated();
        expect(window.location.href).toBe('/login');
    });

    test('Token has expired', () => {
        const expired = jwt.sign(
            { userId: "mock", email: "mock@mail.com" },
            "mocksecret",
            { expiresIn: '0h' }
        );
        res.cookie('authToken', expired, {
            httpOnly: true,
            secure: true,
            maxAge: 0
          });
        authenticated();
        expect(window.location.href).toBe('/login');
    });
});