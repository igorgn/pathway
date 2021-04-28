import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';
import {Activities} from '../src/types/interfaces/activities';
import generateMonths from '../src/utils/generate-months';
import {MarkCompletedPayload} from '../src/types/interfaces/mark-completed-payload';

const app = express();

var jsonParser = bodyParser.json();

const DATA_FILE_PATH = 'server/data/activities.json';

const readActivities = () =>
  new Promise<Activities>((resolve, reject) => {
    fs.readFile(DATA_FILE_PATH, 'utf8', (err, res) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(res));
    });
  });

const writeActivities = (activities: Activities) =>
  new Promise<null>((resolve, reject) => {
    fs.writeFile(DATA_FILE_PATH, JSON.stringify(activities), 'utf8', err => {
      if (err) {
        reject(err);
      }
      resolve(null);
    });
  });

app.get('/activities', async (req, res) => {
  const activities = await readActivities();
  res.send(activities);
});

app.post('/activities', jsonParser, async (req, res) => {
  const newActivityName: string = req.body.name;
  const {activities, activitiesKeys} = await readActivities();

  if (activitiesKeys.includes(newActivityName)) {
    res.status(409).send({errorMessage: 'Activity already exists'});
    return;
  }

  const newActivities: Activities = {
    activities: {
      ...activities,
      [newActivityName]: {
        name: newActivityName,
        months: generateMonths(new Date()),
      },
    },
    activitiesKeys: [...activitiesKeys, newActivityName],
  };
  await writeActivities(newActivities);

  res.send(newActivities);
});

app.delete('/activities', jsonParser, async (req, res) => {
  const activityName: string = req.body.name;
  const {activities, activitiesKeys} = await readActivities();

  if (!activitiesKeys.includes(activityName)) {
    res.status(409).send({errorMessage: 'Activity not found'});
    return;
  }

  const newActivities: Activities = {
    activities: {
      ...activities,
      [req.body.name]: undefined,
    },
    activitiesKeys: activitiesKeys.filter(val => val !== activityName),
  };
  await writeActivities(newActivities);

  res.send(newActivities);
});

app.patch('/mark-activity', jsonParser, async (req, res) => {
  const {dayKey, name, weekKey}: MarkCompletedPayload = req.body;
  const {activities, activitiesKeys} = await readActivities();

  try {
    const currentActivityState =
      activities[name].months.weeks[weekKey].days[dayKey].completed;

    const newActivities: Activities = {
      activities: {
        ...activities,
        [name]: {
          ...activities[name],
          months: {
            ...activities[name].months,
            weeks: {
              ...activities[name].months.weeks,
              [weekKey]: {
                ...activities[name].months.weeks[weekKey],
                days: {
                  ...activities[name].months.weeks[weekKey].days,
                  [dayKey]: {
                    ...activities[name].months.weeks[weekKey].days[dayKey],
                    completed: !currentActivityState,
                  },
                },
              },
            },
          },
        },
      },
      activitiesKeys,
    };
    await writeActivities(newActivities);

    res.send();
  } catch (e) {
    res.status(400).send();
  }
});

app.listen(3000, () => {});
