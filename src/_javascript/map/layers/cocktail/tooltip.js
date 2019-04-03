import {annotation, annotationCalloutElbow} from 'd3-svg-annotation';

const cfg = {
  nx: 220,
  ny: 700,
};

export function createCocktailTooltip(parent, path, dispatcher) {
  // create a container for tooltips
  const tooltip = parent.append('g').classed('tooltip', true);

  dispatcher.on('mun-mouseover.tooltip', data => {
    // TODO: factorize code - we copy/paste quickly for short term demo
    tooltip.call(createAnnotation(data));
  });
  dispatcher.on('mun-mouseout.tooltip', data => {
    tooltip.html('');
  });
}

// this function will call d3.annotation when a tooltip has to be drawn
function createAnnotation(data) {
  return annotation()
    .type(annotationCalloutElbow)
    .annotations([
      {
        data: data,
        note: {
          label: Number.isInteger(data.value)
            ? data.value + ' pesticide(s) found in the drinking water.'
            : 'Never tested.',
          title: data.properties.name + ' (' + data.properties.fuName + ')',
          wrap: cfg.nx,
        },
        nx: cfg.nx,
        ny: cfg.ny,
        x: data.properties.centroid[0], // eslint-disable-line id-length
        y: data.properties.centroid[1], // eslint-disable-line id-length
      },
    ]);
}