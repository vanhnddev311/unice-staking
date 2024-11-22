import Image from 'next/image';

const CampaignTittle = () => {
  return (
    <div>
      <div>
        <Image src={require('@/common/assets/images/moveGptImg.png')} alt="MoveGPT"></Image>
      </div>
      <div className="text-4xl text-white">MoveGPT ($MGPT)</div>
      <div className={'flex'}>{/* <Image src={require('@/common/assets/images/ic')} /> */}</div>
    </div>
  );
};

export default CampaignTittle;
