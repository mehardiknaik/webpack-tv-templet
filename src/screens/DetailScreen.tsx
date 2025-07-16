import React from 'react';
import Vertical from '../components/Focusable/Vertical';
import style from './DetailScreen.module.css';
import Focusable from '../components/Focusable/Focusable';
import clsx from 'clsx';
import { useNavigate } from 'react-router';
import { assets, rows } from '../util/constant';
import Curosel from '../components/Focusable/Curosel';

const DetailScreen = () => {
  const navigate = useNavigate();
  return (
    <Vertical>
      <Focusable className={style.hero} trackChildren>
        <Focusable
          className={({ focused }) => clsx(style.button, focused && style.focused)}
          focusConfig={{
            onEnterPress: () => navigate(-1)
          }}>
          Back
        </Focusable>
        <div>
          <h1>Detail Screen</h1>
          <div className={style.buttons}>
            <Focusable
              autoFocus
              className={({ focused }) => clsx(style.button, focused && style.focused)}>
              Watch
            </Focusable>
            <Focusable className={({ focused }) => clsx(style.button, focused && style.focused)}>
              Add to Watchlist
            </Focusable>
          </div>
        </div>
      </Focusable>
      {rows.map((row, index) => (
        <Focusable className={style.container} key={row.title} trackChildren>
          <div>{row.title}</div>
          <Curosel className={style.curosel} autoFocus={!index}>
            {assets.map((asset) => (
              <Focusable className={style.assetContainer} key={asset.title}>
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

export default DetailScreen;
