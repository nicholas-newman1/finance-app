import React from 'react';
import { cleanup, render } from '@testing-library/react';
import BottomNewsItem from './BottomNewsItem';

describe('<BottomNewsItem />', () => {
  let newsItem: NewsItem;
  beforeEach(() => {
    newsItem = {
      symbol: 'TNAV',
      publishedDate: '2020-11-03 15:44:00',
      title:
        'SHAREHOLDER ALERT: Levi & Korsinsky, LLP Notifies Investors of an Investigation.',
      image: 'https://cdn.snapi.dev/images/v1/h/c/press5---l93oowtyam.jpg',
      site: 'Newsfile Corp',
      text:
        'New York, New York--(Newsfile Corp. - November 3, 2020) - The following statement is being issued by Levi & Korsinsky, LLP:To: All Persons or Entities who purchased Telenav, Inc. (NASDAQ: TNAV) ("Telenav" or the "Company") stock prior to November 3, 2020.You are hereby notified that Levi & Korsinsky, LLP has commenced an investigation into the fairness of the The following statement is being issued by Levi & Korsinsky, LLP:To: All Persons or Entities who purchased Telenav, Inc. (NASDAQ: TNAV) ("Telenav" or the "Company") stock prior to November 3, 2020.You are hereby notified that Levi & Korsinsky, LLP has commenced an investigation into the fairness of the',
      url:
        'https://www.newsfilecorp.com/release/67422/SHAREHOLDER-ALERT-Levi-Korsinsky-LLP-Notifies-Investors-of-an-Investigation-into-the-Fairness-of-the-Sale-of-Telenav-Inc.-to-V99-Inc.',
    } as NewsItem;
  });

  it('should render without crashing', () => {
    render(<BottomNewsItem newsItem={newsItem} />);
  });

  it('should render the title', () => {
    const { getByText } = render(<BottomNewsItem newsItem={newsItem} />);
    getByText(/SHAREHOLDER/);
  });

  it('should truncate title to be 120 characters or less', () => {
    newsItem.title =
      'SHAREHOLDER ALERT: Levi & Korsinsky, LLP Notifies Investors of an Investigation into the Fairness of the Sale of Telenav, Inc. to V99, Inc.';
    const { getByText } = render(<BottomNewsItem newsItem={newsItem} />);
    const title = getByText(/SHAREHOLDER/);
    expect(title.textContent!.length).toBeLessThanOrEqual(120);
  });

  it('should render the site name', () => {
    const { getByText } = render(<BottomNewsItem newsItem={newsItem} />);
    getByText(/^Newsfile Corp$/);
  });

  it('should strip "www." from the site name', () => {
    newsItem.site = 'www.sitename.com';
    const { getByText } = render(<BottomNewsItem newsItem={newsItem} />);
    getByText(/sitename.com/);
  });

  it('should strip "https://" from the site name', () => {
    newsItem.site = 'https://sitename.com';
    const { getByText } = render(<BottomNewsItem newsItem={newsItem} />);
    getByText(/sitename.com/);
    cleanup();
  });

  it('should strip other protocols from the site name', () => {
    newsItem.site = 'wdad://sitename.com';
    const { getByText } = render(<BottomNewsItem newsItem={newsItem} />);
    getByText(/sitename.com/);
    cleanup();
  });

  it('should strip protocol and "www." from the site name', () => {
    newsItem.site = 'https://www.sitename.com';
    const { getByText } = render(<BottomNewsItem newsItem={newsItem} />);
    getByText(/sitename.com/);
  });

  it('should have a time ago string', () => {
    const { getByText } = render(<BottomNewsItem newsItem={newsItem} />);
    getByText(/ago/);
  });

  it('should render the description text', () => {
    const { getByText } = render(<BottomNewsItem newsItem={newsItem} />);
    getByText(/New York/);
  });
});