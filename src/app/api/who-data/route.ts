

import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    // const res = await fetch('https://ghoapi.azureedge.net/api/RS_196?$filter=Dim1%20eq%20%27BTSX%27%20and%20TimeDim%20eq%202015', {
    const res = await fetch('https://ghoapi.azureedge.net/api/RS_196?$filter=Dim1%20eq%20%27BTSX%27', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
  
    // Create a new response with CORS headers.
    const response = NextResponse.json({ data })
    response.headers.set('Access-Control-Allow-Origin', '*')
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    return response
}
  