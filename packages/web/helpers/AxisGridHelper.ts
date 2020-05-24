import * as THREE from "three";

export default class AxisGridHelper {
  constructor(node, units = 10) {
    const axes = new THREE.AxesHelper();
    // @ts-ignore
    axes.material.depthTest = false;
    axes.renderOrder = 2; // after the grid
    node.add(axes);

    const grid = new THREE.GridHelper(units, units);
    // @ts-ignore
    grid.material.depthTest = false;
    grid.renderOrder = 1;
    node.add(grid);
    // @ts-ignore
    this.grid = grid;
    // @ts-ignore
    this.axes = axes;
    this.visible = false;
  }

  get visible() {
    // @ts-ignore
    return this._visible;
  }

  set visible(v) {
    // @ts-ignore
    this._visible = v;
    // @ts-ignore
    this.grid.visible = v;
    // @ts-ignore
    this.axes.visible = v;
  }
}
