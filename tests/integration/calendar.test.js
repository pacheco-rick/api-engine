const request = require('supertest');
const app = require('../../src/app');
const setupTestDB = require('../utils/setupTestDB');

setupTestDB();

describe('Calendar API', () => {
  let eventSlug;
  let labelSlug;

  describe('Create Event', () => {
    it('should create a new event', async () => {
      const res = await request(app)
        .post('/calendar/events')
        .send({
          id: 'test-event-id',
          title: 'Test Event',
          allDay: true,
          start: '2023-05-01T00:00:00.000Z',
          end: '2023-05-02T00:00:00.000Z',
          extendedProps: {},
        })
        .expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toEqual('Test Event');
      expect(res.body.allDay).toEqual(true);
      expect(res.body.start).toEqual('2023-05-01T00:00:00.000Z');
      expect(res.body.end).toEqual('2023-05-02T00:00:00.000Z');
      expect(res.body.extendedProps).toEqual({});
      eventSlug = res.body.id;
    });
  });

  describe('Create Label', () => {
    it('should create a new label', async () => {
      const res = await request(app)
        .post('/calendar/labels')
        .send({
          id: 'test-label-id',
          title: 'Test Label',
          color: '#ff0000',
        })
        .expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toEqual('Test Label');
      expect(res.body.color).toEqual('#ff0000');
      labelSlug = res.body.id;
    });
  });

  describe('Get Events', () => {
    it('should retrieve all events', async () => {
      const res = await request(app).get('/calendar/events').expect(200);

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: eventSlug,
            title: 'Test Event',
            allDay: true,
            start: '2023-05-01T00:00:00.000Z',
            end: '2023-05-02T00:00:00.000Z',
            extendedProps: {},
          }),
        ])
      );
    });
  });

  describe('Get Labels', () => {
    it('should retrieve all labels', async () => {
      const res = await request(app).get('/calendar/labels').expect(200);

      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: labelSlug,
            title: 'Test Label',
            color: '#ff0000',
          }),
        ])
      );
    });
  });
  describe('Update Event', () => {
    it('should update an existing event', async () => {
      const res = await request(app)
        .put(`/calendar/events/${eventSlug}`)
        .send({
          id: 'test-event-id',
          title: 'Updated Test Event',
          allDay: false,
          start: '2023-05-03T00:00:00.000Z',
          end: '2023-05-04T00:00:00.000Z',
          extendedProps: {
            desc: 'Updated description',
            label: labelSlug,
          },
        })
        .expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toEqual('Updated Test Event');
      expect(res.body.allDay).toEqual(false);
      expect(res.body.start).toEqual('2023-05-03T00:00:00.000Z');
      expect(res.body.end).toEqual('2023-05-04T00:00:00.000Z');
      expect(res.body.extendedProps.desc).toEqual('Updated description');
      expect(res.body.extendedProps.label).toEqual(labelSlug);
    });
  });

  describe('Update Label', () => {
    it('should update an existing label', async () => {
      const res = await request(app)
        .put(`/calendar/labels/${labelSlug}`)
        .send({
          id: 'test-label-id',
          title: 'Updated Test Label',
          color: '#0000ff',
        })
        .expect(200);

      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toEqual('Updated Test Label');
      expect(res.body.color).toEqual('#0000ff');
    });
  });

  describe('Delete Event', () => {
    it('should delete an existing event', async () => {
      await request(app).delete(`/calendar/events/${eventSlug}`).expect(200);

      const res = await request(app).get('/calendar/events').expect(200);

      expect(res.body).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: eventSlug,
            title: 'Updated Test Event',
            allDay: false,
            start: '2023-05-03T00:00:00.000Z',
            end: '2023-05-04T00:00:00.000Z',
            extendedProps: {
              desc: 'Updated description',
              label: labelSlug,
            },
          }),
        ])
      );
    });
  });

  describe('Delete Label', () => {
    it('should delete an existing label', async () => {
      await request(app).delete(`/calendar/labels/${labelSlug}`).expect(200);

      const res = await request(app).get('/calendar/labels').expect(200);

      expect(res.body).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: labelSlug,
            title: 'Updated Test Label',
            color: '#0000ff',
          }),
        ])
      );
    });
  });
});
