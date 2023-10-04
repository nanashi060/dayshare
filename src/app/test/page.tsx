'use client';

import { Tag } from '@/components/post/Tag';

const Main = () => {
  const titleList = ['高校生', 'エンジニア'];
  return (
    <>
      <Tag titleList={titleList} />
      {/* <div>test1</div> */}
    </>
  );
};

export default Main;
