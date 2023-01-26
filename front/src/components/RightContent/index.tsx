import { QuestionCircleOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { SelectLang, useModel } from '@umijs/max';
import React from 'react';
import Avatar from './AvatarDropdown';

/**
 * 导航右侧头像与语言切换
 */
const GlobalHeaderRight: React.FC = () => {
  const className = useEmotionCss(() => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      gap: 8,
    };
  });

  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      float: 'right',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      cursor: 'pointer',
      padding: '0 12px',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  return (
    <div className={className}>
      {/*那个问号*/}
      <span className={actionClassName} onClick={() => {
          window.open('https://pro.ant.design/docs/getting-started');
        }}><QuestionCircleOutlined /></span>
      <Avatar menu/> {/*头像及其下拉*/}
      <SelectLang className={actionClassName} /> {/*语言选择框*/}
    </div>
  );
};
export default GlobalHeaderRight;
