import React from 'react';
import MainNewsItemLoading from './MainNewsItemLoading';
import { NewsItem } from '../../../common/types/APITypes';
import { getTimeAgoString, truncate } from '../../../common/utils/helpers';
import './mainNewsItem.css';
import FetchErrorContainer from '../../../common/containers/FetchErrorContainer';

interface Props {
  data: NewsItem;
  loading: boolean;
  error: string;
}

const MainNewsItem: React.FC<Props> = ({ data, loading, error }) => {
  if (loading) return <MainNewsItemLoading />;
  if (error) return <FetchErrorContainer error='Failed to fetch news' />;

  const { site, title, text, publishedDate, url, image } = data;

  return (
    <a href={url} className='main-news-item'>
      <div
        className='main-news-item__image'
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className='main-news-item__content'>
        <h1 className='main-news-item__heading'>
          {title.length > 100 ? <>{truncate(title, 100)}&hellip;</> : title}
        </h1>
        <p className='main-news-item__meta'>
          {site} - <em>{getTimeAgoString(Date.parse(publishedDate))}</em>
        </p>
        <p className='main-news-item__description'>
          {text.length > 200 ? <>{truncate(text, 200)}&hellip;</> : text}
        </p>
      </div>
    </a>
  );
};

export default MainNewsItem;