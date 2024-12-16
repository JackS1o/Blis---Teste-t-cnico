import { createAbilityUseCase } from "../useCases/createAbilityUseCase";
import { Request, Response } from 'express';
import { updateAbilityUseCase } from "../useCases/updateAbilityUseCase";

export const createAbility = async (req: Request, res: Response) => {
  const { name } = req.body;
  const ability = await createAbilityUseCase(name);
  res.status(201).json(ability);
};

export const updateAbility = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { active } = req.body;
  const ability = await updateAbilityUseCase(id, active);
  res.status(200).json(ability);
};
