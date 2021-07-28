import { AnnotatedPrediction } from '@tensorflow-models/handpose';

import { FINGER_INDICES as ALL_FINGER_INDICES } from './consts';

export const drawHand = (predictions: AnnotatedPrediction[], ctx: CanvasRenderingContext2D) => {
  if (!predictions.length) return;

  predictions.forEach((prediction) => {
    const { landmarks } = prediction;

    Object.values(ALL_FINGER_INDICES).forEach((fingerIndices) => {
      for (let i = 0; i < fingerIndices.length - 1; i += 1) {
        const firstJointIdx = fingerIndices[i];
        const secondJointIdx = fingerIndices[i + 1];
        const [x1, y1] = landmarks[firstJointIdx];
        const [x2, y2] = landmarks[secondJointIdx];

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = 'azure';
        ctx.lineWidth = 4;
        ctx.stroke();
      }
    });

    landmarks.forEach((landmark) => {
      const [x, y] = landmark;

      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 3 * Math.PI);

      ctx.fillStyle = 'indigo';
      ctx.fill();
    });
  });
};
