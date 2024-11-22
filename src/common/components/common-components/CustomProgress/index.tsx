import { formatNumber } from '@/utils';
import { Progress } from 'antd';
import { useEffect } from 'react';

interface Props {
  progress: number;
}

const CustomProgress: React.FunctionComponent<Props> = ({ progress }) => {
  useEffect(() => {
    const progressBars = document.querySelectorAll('.ant-progress-bg');
    progressBars.forEach((progressBar) => {
      // if (!progressBar.querySelector('.custom-div')) {
      const customDiv = document.createElement('div');
      customDiv.className = 'custom-div';
      customDiv.innerText = `${formatNumber(progress, 1)}%`;
      customDiv.style.position = 'absolute';
      customDiv.style.height = '20px';
      customDiv.style.display = 'flex';
      customDiv.style.justifyContent = 'center';
      customDiv.style.alignItems = 'center';
      customDiv.style.top = '50%';
      customDiv.style.right = '1px';
      customDiv.style.transform = 'translate(0%, -50%)';
      customDiv.style.padding = '4px 8px';
      customDiv.style.color = '#000';
      customDiv.style.fontSize = '12px';
      customDiv.style.fontWeight = '700';
      customDiv.style.backgroundColor = '#fff';
      customDiv.style.borderRadius = '47px';
      customDiv.style.border = '1px solid #1AC774';
      customDiv.style.backgroundColor = '#fff';
      progressBar.appendChild(customDiv);
      // }
    });
  }, [progress]);

  return <Progress className={'list-camp-progress h-[18px] z-10'} percent={progress} />;
};

export default CustomProgress;
