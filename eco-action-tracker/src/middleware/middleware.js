import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function auth(handler) {
  return async (request) => {
    try {
      const token = request.cookies.get('authToken')?.value;      
      if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      request.user = decoded;
      return handler(request);
    } catch (error) {
      console.error('JWT Error:', error);
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
  };
}
