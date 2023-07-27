import { NextRequest, NextResponse } from 'next/server';
import * as jose from 'jose';
export async function middleware(req, res, next) {
    const bearerToken = req.headers.get('authorization');

    if (!bearerToken) {
        return new NextResponse(
            JSON.stringify({ errorMessage: "Unauthorized" })
        )
    }

    const token = bearerToken.split(' ')[1];

    if (!token) return new NextResponse(
        JSON.stringify({ errorMessage: "Unauthorized" })
    )

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
        await jose.jwtVerify(token, secret);
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ errorMessage: "Unauthorized" })
        )
    }
}

export const config = {
    runtime: 'experimental-edge',
    unstable_allowDynamic: [
        '/lib/utilities.js',
        '/node_modules/function-bind/**',
    ],
    matcher: ['/api/auth/me'],
};
