import {
  meditationSessionSchema,
  type MeditationSession,
} from "#/domain/models";
import type BaseRepository from "./BaseRepository";

function cloneSession(session: MeditationSession) {
  return structuredClone(session);
}

export default class FakeMeditationSessionRepository implements BaseRepository<MeditationSession> {
  private readonly sessions = new Map<string, MeditationSession>();

  constructor(initialSessions: readonly MeditationSession[] = []) {
    for (const session of initialSessions) {
      const parsedSession = meditationSessionSchema.parse(session);

      if (this.sessions.has(parsedSession.id)) {
        throw new Error(`Duplicate meditation session id: ${parsedSession.id}`);
      }

      this.sessions.set(parsedSession.id, cloneSession(parsedSession));
    }
  }

  async getAll(): Promise<MeditationSession[]> {
    return Array.from(this.sessions.values(), cloneSession);
  }

  async getById(id: string): Promise<MeditationSession | null> {
    const session = this.sessions.get(id);
    return session ? cloneSession(session) : null;
  }

  async create(item: MeditationSession): Promise<MeditationSession> {
    const session = meditationSessionSchema.parse(item);

    if (this.sessions.has(session.id)) {
      throw new Error(`Meditation session already exists: ${session.id}`);
    }

    const storedSession = cloneSession(session);
    this.sessions.set(storedSession.id, storedSession);
    return cloneSession(storedSession);
  }

  async update(
    id: string,
    item: Partial<MeditationSession>,
  ): Promise<MeditationSession | null> {
    const currentSession = this.sessions.get(id);

    if (!currentSession) return null;

    const updatedSession = meditationSessionSchema.parse({
      ...currentSession,
      ...item,
      id,
    });

    const storedSession = cloneSession(updatedSession);
    this.sessions.set(id, storedSession);
    return cloneSession(storedSession);
  }

  async delete(id: string): Promise<boolean> {
    return this.sessions.delete(id);
  }
}
