import React from 'react';

test('it gets movies', () => {
    let movs = this.props.getMovies('bambi');
    expect(movs).arrayContaining();
});