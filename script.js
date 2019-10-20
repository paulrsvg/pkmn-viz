/* If you're feeling fancy you can add interactivity 
    to your site with Javascript */

// prints "hi" in the browser's dev tools console
console.log("hi");

var yo = "yoyo";


var waffle = d3.select('.waffle');

var numbers = d3.range(100)

waffle
	.selectAll('.block')
  .data(numbers)
  .enter()
  .append('div')
  .attr('class','block')
  .style('background-color',d => (d < 39 ? '#FE4A49' : '#ccc' ));
  
  //now a histogram w/ real data
  // include data (this could be imported)


//char =   39.3%     | 32.5%      |   28.2% |
  //157      | 130| 113 |
  //now a stacked bar chart!
  var socialMedia = [
	{
		month: 'April',
		counts: { Facebook: 157, YouTube: 130, Twitter: 113,  }
	},
	{
		month: 'May',
		counts: { Facebook: 114, YouTube: 170, Twitter: 104,  }
	},
	{
		month: 'June',
		counts: { Facebook: 169, YouTube: 319, Twitter: 98,  }
	}
];

var smTotal = socialMedia.map(d => {
	var counts = d3.entries(d.counts);
  var total = d3.sum(counts, c => c.value);
  return {month: d.month, counts, total }
  });
  
var scaleY = d3.scaleLinear()
								.range([0, 200])
                .domain([0, d3.max(smTotal, d => d.total)]);
                
var scaleColor = d3.scaleOrdinal()
										.range(['#f0f9e8','#bae4bc','#7bccc4','#2b8cbe'])
                    .domain(['fb','yt','tw','ig']);

var stack = d3.select('.stack');

var group1 = stack.selectAll('group1')
								.data(smTotal)
                .enter()
                .append('div')
                .attr('class','group1');
                
var block1 = group1.selectAll('block1')
								.data(d => d.counts)
                .enter()
                .append('div')
                .attr('class', 'block1')
                .style('height',d => `${scaleY(d.value)}px` )
                .style('background-color', d => scaleColor(d.key));
                
var label = group1.append('text')
								.text(d => d.month)
                .attr('class', 'label');
                
// const count = group1.append('text')
// 								.text(d => d3.format('0.2s')(total))
//                 .attr('class','count');
                
     

