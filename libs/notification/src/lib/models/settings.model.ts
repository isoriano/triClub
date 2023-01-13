import { ThemePalette } from '@isg/ui';

export class Settings {
  color: ThemePalette;
  position?: {
    horitzontal: string;
    vertical: string;
  };

  constructor(public title: string, public content: string, color?: ThemePalette, pHoritzontal?: string, pVertical?: string) {
    this.color = color ?? 'primary';
    this.position = {
      horitzontal: pHoritzontal ?? 'top',
      vertical: pVertical ?? 'right'
    };
  }
}
