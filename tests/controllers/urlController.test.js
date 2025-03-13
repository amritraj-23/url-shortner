const request = require('supertest');
const app = require('../../app');
const urlService = require('../../services/urlService');

jest.mock('../../services/urlService');

describe('URL Controller', () => {
  describe('POST /api/urls', () => {
    it('should create a short URL successfully', async () => {
      const mockResponse = {
        originalUrl: 'https://example.com',
        shortUrl: 'abc123',
        createdAt: new Date()
      };

      urlService.createShortUrl.mockResolvedValue(mockResponse);

      const response = await request(app)
        .post('/api/urls')
        .send({ originalUrl: 'https://example.com' });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });

    it('should handle invalid URLs', async () => {
      const response = await request(app)
        .post('/api/urls')
        .send({ originalUrl: 'invalid-url' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /:shortUrl', () => {
    it('should redirect to original URL', async () => {
      const originalUrl = 'https://example.com';
      urlService.getOriginalUrl.mockResolvedValue(originalUrl);

      const response = await request(app)
        .get('/abc123');

      expect(response.status).toBe(302);
      expect(response.header.location).toBe(originalUrl);
    });

    it('should handle non-existent URLs', async () => {
      urlService.getOriginalUrl.mockResolvedValue(null);

      const response = await request(app)
        .get('/nonexistent');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
}); 