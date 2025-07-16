import Vertical from '../components/Focusable/Vertical';
import Focusable from '../components/Focusable/Focusable';
import Curosel from '../components/Focusable/Curosel';
import { assets, rows } from '../util/constant';
import clsx from 'clsx';
import { useNavigate } from 'react-router';
import { usePageContext } from '../HOC/withKeepAlive';
import style from './HomeScreen.module.css';

const HomeScreen = () => {
  const { pageInView, pathname } = usePageContext();
  const navigate = useNavigate();

  const onPress = () => {
    navigate('/detail');
  };
  console.log('pageInView', pageInView, pathname);
  return (
    <Vertical className={style.main}>
      {rows.map((row, index) => (
        <Focusable className={style.container} key={row.title} trackChildren>
          <div>{row.title}</div>
          <Curosel className={style.curosel} autoFocus={!index}>
            {assets.map((asset) => (
              <Focusable
                className={style.assetContainer}
                key={asset.title}
                focusConfig={{
                  onEnterPress: onPress
                }}>
                {({ focused }) => (
                  <>
                    <div className={clsx(style.asset, focused && style.focused)}></div>
                    <div className={clsx(style.text, focused && style.textfocused)}>
                      {asset.title}
                    </div>
                  </>
                )}
              </Focusable>
            ))}
          </Curosel>
        </Focusable>
      ))}
    </Vertical>
  );
};

export default HomeScreen;
