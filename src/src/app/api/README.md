# API Documentation

This document provides information about the available API endpoints in our application.

## Base URL

All API endpoints are relative to: `/api`

## Authentication

Endpoints require API keys to be set in your environment variables:
- `VIRUSTOTAL_API_KEY`: Required for VirusTotal endpoints
- `OPENAI_API_KEY`: Required for OpenAI endpoints

## Endpoints

### Structure
The API routes are organized in the following structure:

```
api/
├── health/
│   └── route.ts           # Health check endpoint
├── virustotal/
│   ├── url/              # URL analysis endpoints
│   │   └── analyze/      # Process URL analysis
│   ├── ip/               # IP analysis endpoints
│   │   └── analyze/      # Process IP analysis
│   └── file/             # File analysis endpoints
│       └── analyze/      # Process file analysis
└── openai/
    ├── emailAnalysis/    # Email analysis endpoint
    ├── generateEmail/    # Email generation endpoint
    └── quiz/             # Quiz generation endpoint
```

Each endpoint follows the Next.js App Router convention with a `route.ts` file that handles the API logic. The endpoints are grouped by their respective services (VirusTotal and OpenAI) for better organization and maintainability.


### VirusTotal

#### URL Analysis
`POST /virustotal/url/analyze`

Analyze a URL for potential security threats.

**Request Body:**
```json
{
  "url": "string"
}
```

#### IP Analysis
`POST /virustotal/ip/analyze`

Analyze an IP address for potential security threats.

**Request Body:**
```json
{
  "ip": "string"
}
```

#### File Analysis
`POST /virustotal/file/analyze`

Analyze a file for potential security threats.

**Request Body:**
Multipart form data with file

### OpenAI

#### Email Analysis
`POST /OpenAI/emailAnalysis`

Analyze email content using AI.

**Request Body:**
```json
{
  "content": "string"
}
```

#### Generate Email
`POST /OpenAI/generateEmail`

Generate email content using AI.

**Request Body:**
```json
{
  "prompt": "string",
  "format": "string" // "html" or "plain-text"
}
```

#### Quiz Generation
`POST /OpenAI/quiz`

Generate quiz questions using AI.

**Request Body:**
```json
{
  "topic": "string",
  "difficulty": "string"
}
```

### Health Check
`GET /health`

Check API health status.

**Response:**
```json
{
  "status": "ok"
}
```

## Error Handling

All endpoints follow a standard error response format:

```json
{
  "error": {
    "message": "Error description",
    "code": "ERROR_CODE"
  }
}
```

## Rate Limiting

Please note that both VirusTotal and OpenAI APIs have their own rate limiting policies. Make sure to handle rate limiting errors appropriately in your application.