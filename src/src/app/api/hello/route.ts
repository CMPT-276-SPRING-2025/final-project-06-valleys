import { NextResponse } from 'next/server';

export async function GET() {
    // Define a fake JSON response
    const fakeData = {
        id: 1,
        name: 'Fake User',
        email: 'fake.user@example.com',
        role: 'Admin',
        createdAt: '2023-10-01T12:00:00Z',
    };

    // Return the JSON response
    return NextResponse.json(fakeData);
}