// Create your variables and functions.

let gameDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json';

let gameData;

let canvas = d3.select('#canvas');
let tooltip = d3.select('#tooltip');

let drawTreeMap = () => {
    // Create your hierarchy.
    let hierarchy = d3.hierarchy(gameData, (node) => {
        return node['children']
    }
    ).sum(
        (node) => {
            return node['value']
        }
    ).sort(
        (node1, node2) => {
            return node2['value'] - node1['value']
        }
    )

    let createTreeMap = d3.treemap()
      .size([1000, 600]) // Here we make the treemap the same size as our canvas.
      createTreeMap(hierarchy) // Many datasets are intrinsically hierarchical. 

      let gameTiles = hierarchy.leaves()
      console.log(gameTiles)

    let block = canvas.selectAll('g')
      .data(gameTiles)
      .enter()
      .append('g')
      .attr('transform', (game) => {
        return 'translate (' + game['x0'] + ', ' + game['y0'] +')'
      })

    block.append('rect')
      .attr('class', 'tile')
      .attr('fill', (game) => {
        let category = game['data']['category']
        if(category === 'Wii'){
            return '#6495ed'
        }else if(category === 'DS'){
            return '#008b8b'
        }else if(category === 'X360'){
            return '#006400'
        }else if(category === 'GB'){
            return '#9370db'
        }else if(category === 'PS3'){
            return '#00008b'
        }else if(category === 'NES'){
            return '#696969'
        }else if(category === '3DS'){
            return '#b22222'
        }else if(category === 'PS'){
            return '#ffb6c1'
        }else if(category === 'N64'){
            return '#ffa500'
        }else if(category === 'PS2'){
            return '#1e90ff'
        }else if(category === 'PS4'){
            return '#db7093'
        }else{
            return '#008080'
        }
      })
      .attr('data-name', (game) => {
        return game['data']['name']
      })
      .attr('data-category', (game) => {
        return game['data']['category']
      })
      .attr('data-value', (game) => {
        return game['data']['value']
      })
      .attr('width', (game) => {
        return game['x1'] - game['x0']
      })
      .attr('height', (game) => {
        return game['y1'] - game['y0']
      })
      .on('mousemove', function (event, d) {
        tooltip.style('visibility', 'visible');
        tooltip
          .html(
            'Name: ' +
              d.data.name +
              '<br>Category: ' +
              d.data.category +
              '<br>Value: ' +
              d.data.value
          )
          .attr('data-value', d.data.value)
          .style('left', event.pageX + 10 + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', function () {
        tooltip.style('visibility', 'hidden');
      })

    block.append('text')
      .text((game) => {
        return game['data']['name']
      })
      .attr('x', 5)
      .attr('y', 30)

};

// Now we fetch the data.

d3.json(gameDataUrl).then((data, error) => {
    if(error){
        console.log(error)
    }else {
        gameData = data
        console.log(gameData)
        drawTreeMap()
    }
});