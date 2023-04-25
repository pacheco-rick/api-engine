const request = require('supertest');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');

setupTestDB();

describe('Chat API', () => {
  let contactId;
  // eslint-disable-next-line no-unused-vars
  let chatId;

  describe('Create Contact', () => {
    it('should create a new contact', async () => {
      const res = await request(app)
        .post('/chat/contacts')
        .send({
          name: 'John Doe',
          about: 'Lorem ipsum dolor sit amet',
          details: { email: 'johndoe@example.com' },
        })
        .expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toEqual('John Doe');
      expect(res.body.about).toEqual('Lorem ipsum dolor sit amet');
      expect(res.body.details).toEqual({ email: 'johndoe@example.com' });

      contactId = res.body.id;
    });
  });

  describe('Create Chat', () => {
    it('should create a new chat', async () => {
      const res = await request(app)
        .post(`/chat/chats/${contactId}`)
        .send({
          chatId: 'test-chat-id',
          contactId,
          createdAt: '2023-05-01T00:00:00.000Z',
          value: 'Hello, John!',
        })
        .expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body.chatId).toEqual('test-chat-id');
      expect(res.body.contactId).toEqual(contactId);
      expect(res.body.createdAt).toEqual('2023-05-01T00:00:00.000Z');
      expect(res.body.value).toEqual('Hello, John!');

      chatId = res.body.id;
    });
  });

  describe('Update Contact', () => {
    it('should update an existing contact', async () => {
      const res = await request(app)
        .put(`/chat/contacts/${contactId}`)
        .send({
          about: 'Updated about',
          attachments: {},
          avatar: null,
          details: { email: 'johndoe.updated@example.com' },
          id: contactId,
          name: 'Updated John Doe',
        })
        .expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toEqual('Updated John Doe');
      expect(res.body.about).toEqual('Updated about');
      expect(res.body.details).toEqual({ email: 'johndoe.updated@example.com' });
    });
  });

  describe('Delete Chat', () => {
    it('should delete an existing chat', async () => {
      await request(app).delete(`/chat/chats/${contactId}`).expect(200);

      await request(app).get(`/chat/chats/${contactId}`).expect(404);
    });
  });

  describe('Delete Contact', () => {
    it('should delete an existing contact', async () => {
      await request(app).delete(`/chat/contacts/${contactId}`).expect(200);

      await request(app).get(`/chat/contacts/${contactId}`).expect(404);
    });
  });
});
