import activeSkillsJson from '@/data/active-skills.json';

import { ActiveSkillSchema } from '@/schemas/skill';
import { z } from 'zod';

export const ACTIVE_SKILLS = z.array(ActiveSkillSchema).parse(activeSkillsJson);

export function getActiveSkillById(id: string) {
  return ACTIVE_SKILLS.find((skill) => skill.id === id) ?? null;
}
