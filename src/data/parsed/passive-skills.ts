import passiveSkillsJson from '@/data/passive-skills.json';
import { PassiveSkillSchema } from '@/schemas/skill';
import { z } from 'zod';

export const PASSIVE_SKILLS = z.array(PassiveSkillSchema).parse(passiveSkillsJson);
