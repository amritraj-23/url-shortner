# URL Shortener Service

A robust URL shortening service built with Node.js, Express, MongoDB, and Redis for caching. This service provides fast and reliable URL shortening capabilities with rate limiting and analytics features.

## Features

- URL shortening with custom slug support
- Redis caching for improved performance
- Rate limiting to prevent abuse
- Docker support for easy deployment
- MongoDB for persistent storage
- Basic analytics for URL visits

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Redis
- Docker and Docker Compose (optional)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/amritraj-23/url-shortner.git
   cd url-shortner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/urlshortener
   REDIS_HOST=localhost
   REDIS_PORT=6379
   BASE_URL=http://localhost:3000
   ```

## Running the Application

### Using Node.js directly:
```bash
npm start
```

### Using Docker:
```bash
docker-compose up
```

## API Endpoints

### Create Short URL
- **POST** `/api/urls`
  ```json
  {
    "originalUrl": "https://example.com/very-long-url"
  }
  ```

### Redirect to Original URL
- **GET** `/:shortUrl`

## Development

```bash
# Run in development mode
npm run dev

# Run tests
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Amrit Raj - [GitHub](https://github.com/amritraj-23) 