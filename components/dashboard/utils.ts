import { Activity } from '@prisma/client';
import { useState } from 'react';
import { ActivityType } from '../../types';
import { fetcher } from '../../utils/fetcher';

/**
 * Add a new activity and returns it.
 * @param name Name of the new activity
 * @param type Type is enum of 'Neutral', 'Productive', 'Very Productive', 'Distracting', 'Very Distracting'
 * @returns new activity
 */
export const addActivity = async (
  name: string,
  type: ActivityType
): Promise<Activity> => {
  return await fetcher('/activities/add', { name, type });
};

/**
 * Update a block
 * @param blockId Id of the current block
 * @param activityId Id of the activity
 * @returns updated block
 */
export const updateBlockActivity = async (
  blockId: number,
  activityId: number
) => {
  return await fetcher('/logs/update', { blockId, activityId });
};

/**
 * Returns if a block should be allowed to edit.
 * @param to Date -- time where the current block ends
 * @returns boolean -- true if `to` is less than current time
 */
export const allowBlockEdit = (to: Date): boolean => {
  const currentTime = new Date(Date.now());
  return new Date(to) <= currentTime;
};
