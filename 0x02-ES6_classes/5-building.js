class Building {
    constructor(sqft) {
      if (this.constructor === Building) {
        throw new Error('Abstract classes can\'t be instantiated directly');
      }
      if (typeof sqft !== 'number') {
        throw new TypeError('Sqft must be a number');
      }
      this._sqft = sqft;
    }
  
    get sqft() {
      return this._sqft;
    }
  
    evacuationWarningMessage() {
      throw new Error('Class extending Building must override evacuationWarningMessage');
    }
  }
  
  class TestBuilding extends Building {
    // Must implement evacuationWarningMessage method
    evacuationWarningMessage() {
      return 'Warning! Evacuation in progress.';
    }
  }
  
  const b = new Building(100); // This will throw an error
  