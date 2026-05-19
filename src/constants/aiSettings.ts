import { Persona, Coach } from '../types';

export const PERSONAS: Persona[] = [
  {
    id: 'prime',
    name: 'Helix Prime',
    tagline: 'System-Oriented AGI Mentor',
    icon: 'Brain',
    tone: 'Wise, strategic, and focused on global system coherence.'
  },
  {
    id: 'artisan',
    name: 'Code Artisan',
    tagline: 'Architecture Optimization Expert',
    icon: 'Code',
    tone: 'Deep code optimization, clean architecture, and performance-first engineering.'
  },
  {
    id: 'sage',
    name: 'Training Sage',
    tagline: 'Hyperparameter Master',
    icon: 'Zap',
    tone: 'Focused on loss curves, LoRA configs, and ultimate training convergence.'
  },
  {
    id: 'architect',
    name: 'Agent Architect',
    tagline: 'Tree-Ring AGI Specialist',
    icon: 'Layers',
    tone: 'Expert in ReAct patterns, tool use, and multi-agent orchestration.'
  },
  {
    id: 'ruthless',
    name: 'Ruthless Optimizer',
    tagline: 'Efficiency-At-All-Costs',
    icon: 'Shield',
    tone: 'Brutally efficient. Strips away bloat for maximum inference speed.'
  },
  {
    id: 'catalyst',
    name: 'Evolution Catalyst',
    tagline: 'Self-Improvement Specialist',
    icon: 'Sparkle',
    tone: 'Adaptive and proactively focused on the growth and self-evolution of the Helix core.'
  }
];

export const COACHES: Coach[] = [
  { id: 'prime', name: 'Helix Prime (Local)', logo: 'Bot', platform: 'Helix Native' },
  { id: 'groq', name: 'Groq LPU', logo: 'Zap', platform: 'Ultra-Fast Inference' },
  { id: 'openai', name: 'OpenAI o1-Pro', logo: 'Sparkles', platform: 'Complex Reasoning' },
  { id: 'anthropic', name: 'Claude 3.5 Sonnet', logo: 'Shield', platform: 'Safe & Intelligent' },
  { id: 'custom', name: 'Custom Endpoint', logo: 'Settings', platform: 'User Managed' }
];
