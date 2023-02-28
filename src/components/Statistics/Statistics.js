import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries } from 'react-vis';
import ContentFinder from '../../APIs/ContentFinder';

const Statistics = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    ContentFinder.get('/')
      .then(response => {
        setContents(response.data.data.contents);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // Convert contents array to data array for the chart
  const data = contents.map((content, index) => {
    return {
      x: index,
      y: parseFloat(content.title) // replace with the actual numeric value from your data
    };
  });

  return (
    <div>
      <Helmet>
        <title>Statistics</title>
      </Helmet>
      <h3 className='text-justify mx-4 mt-4 lg:text-xl sm:text-sm'>Welcome to the statistics page! Here you can find valuable insights about the challenges and contents uploaded by our users. Check out the graphs and charts to see how users are performing in different challenges, and get a glimpse of the most popular content uploaded. Stay tuned for more updates!</h3>
      <XYPlot height={300} width={600} margin={{ left: 50 }} >
        <HorizontalGridLines />
        <LineSeries data={data} color="#0077c2" />
        <XAxis />
        <YAxis />
      </XYPlot>
    </div>
  );
};

export default Statistics;
