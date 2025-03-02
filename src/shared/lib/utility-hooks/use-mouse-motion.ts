import { useAnimation } from 'motion/react';

export function useMouseMotion() {
  const controls = useAnimation();

  const handleMouseEnter = () => {
    controls.start('animate');
  };

  const handleMouseLeave = () => {
    controls.start('normal');
  };

  return { controls, handleMouseEnter, handleMouseLeave };
}
