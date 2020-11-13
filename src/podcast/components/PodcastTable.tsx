import { Fab, TableCell } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PodcastData } from '../../common/podcast';
import { BlocksTable, Headers } from '../../components/Table/Table';
import { State } from '../../store/types';
import { loadPodcasts, selectPodcast, setPodcastPlay } from '../store/actions';
import { cyPodcastTable, filterDuration, filterPublishDate } from './util';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { PodcastState } from '../store/types';

export const headers: Headers<PodcastData>[] = [
  {
    label: 'Action',
    hide: true,
  },
  {
    value: 'number',
    label: 'Number',
    align: 'left',
    sortable: true,
  },
  {
    value: 'title',
    label: 'Title',
  },
  {
    value: 'description',
    label: 'Description',
  },
  {
    value: 'duration',
    label: 'Length',
    sortable: true,
    filter: filterDuration,
  },
  {
    value: 'published',
    label: 'Published On',
    filter: filterPublishDate,
  },
];

const prepend = (podcast: PodcastData) => {
  const dispatch = useDispatch();
  const { selectedPodcast, playing } = useSelector<State, PodcastState>(({ podcast }) => podcast);
  const currentlySelected = selectedPodcast?.number === podcast.number;

  const playPodcast = () => {
    dispatch(selectPodcast(podcast));
  };

  const pausePodcast = () => {
    dispatch(setPodcastPlay(false));
  };

  return (
    <TableCell>
      {currentlySelected && playing ? 
        <Fab onClick={pausePodcast} color="primary" data-cy={cyPodcastTable.pauseButton}>
          <PauseIcon />
        </Fab> :
        <Fab onClick={playPodcast} color="primary" data-cy={cyPodcastTable.playButton}>
          <PlayArrowIcon />
        </Fab>
      }
    </TableCell>
  );
};

const PodcastTable: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPodcasts());
  }, []);
  const rows = useSelector<State, PodcastData[]>((state) => state.podcast.podcasts);
  return (
    <BlocksTable headers={headers} rows={rows} prepend={prepend} dense/>
  );
};

export default PodcastTable;