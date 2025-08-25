import { Event, EventStatus } from './event.entity';

describe('Event Entity', () => {
  it('should create an event instance', () => {
    const event = new Event();
    
    expect(event).toBeInstanceOf(Event);
  });

  it('should have default values', () => {
    const event = new Event();
    
    expect(event.isPublic).toBe(true);
    expect(event.status).toBe(EventStatus.DRAFT);
  });

  it('should accept all required properties', () => {
    const event = new Event();
    const now = new Date();
    
    event.name = 'Show de Rock';
    event.description = 'Um incrível show de rock';
    event.slug = 'show-de-rock';
    event.thumbnail = 'https://example.com/thumbnail.jpg';
    event.banner = 'https://example.com/banner.jpg';
    event.startAt = now;
    event.endAt = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 horas depois
    event.startSaleAt = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 dias antes
    event.endSaleAt = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000); // 1 dia antes
    event.openDoorAt = new Date(now.getTime() - 30 * 60 * 1000); // 30 minutos antes
    event.isPublic = true;
    event.showWebsite = 'https://example.com';
    event.status = EventStatus.ACTIVE;
    
    expect(event.name).toBe('Show de Rock');
    expect(event.description).toBe('Um incrível show de rock');
    expect(event.slug).toBe('show-de-rock');
    expect(event.thumbnail).toBe('https://example.com/thumbnail.jpg');
    expect(event.banner).toBe('https://example.com/banner.jpg');
    expect(event.startAt).toBe(now);
    expect(event.isPublic).toBe(true);
    expect(event.showWebsite).toBe('https://example.com');
    expect(event.status).toBe(EventStatus.ACTIVE);
  });

  it('should handle EventStatus enum values', () => {
    expect(EventStatus.DRAFT).toBe('DRAFT');
    expect(EventStatus.ACTIVE).toBe('ACTIVE');
    expect(EventStatus.CANCELLED).toBe('CANCELLED');
    expect(EventStatus.FINISHED).toBe('FINISHED');
  });
});
