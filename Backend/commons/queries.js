const driversByIdQuery = `
select drivers.driverid, drivers.forename || ' ' || drivers.surname as driver, sum(driver_standings.wins) as wins
from drivers
join driver_standings
on drivers.driverid = driver_standings.driverid
join races
on races.raceid = driver_standings.raceid
where races.year = $1
group by drivers.driverid
order by sum(driver_standings.wins) desc
`;

const driverById = `
select * from drivers
where drivers.driverid = $1
`;

const driverByName = `
select * from drivers
where drivers.forename || ' ' || drivers.surname = $1
`;

const racesByDriverId = `
select races.raceid, 
avg(lap_times.milliseconds) as average_lap_time, 
min(lap_times.milliseconds) as fastest_lap_time,
max(lap_times.milliseconds) as slowest_lap_time,
count(lap_times.milliseconds) as total_pit_stops, 
min(pit_stops.milliseconds) as fastest_pit_stop,
max(pit_stops.milliseconds) as slowest_pit_stop,
circuits.name as circuit_name,
driver_standings.points as points,
driver_standings.position as position
from drivers
join driver_standings
on drivers.driverid = driver_standings.driverid
join races
and driver_standings.raceid = races.raceid
join circuits
on races.cercuitid = circuits.cercuitid
join lap_times
on races.raceid = lap_times.raceid
and lap_times.driverid = drivers.driverid
join pit_stops
on lap_times.raceid = lap_times.raceid
and pit_stops.driverid = drivers.driverid
where drivers.driverid = $1
group by races.raceid, drivers.driverid
order by races.date desc
`;

const racesByDriverName = `
select races.raceid, 
avg(lap_times.milliseconds) as average_lap_time, 
min(lap_times.milliseconds) as fastest_lap_time,
max(lap_times.milliseconds) as slowest_lap_time,
count(lap_times.milliseconds) as total_pit_stops, 
min(pit_stops.milliseconds) as fastest_pit_stop,
max(pit_stops.milliseconds) as slowest_pit_stop,
circuits.name as circuit_name,
driver_standings.points as points,
driver_standings.position as position
from drivers
join driver_standings
on drivers.driverid = driver_standings.driverid
join races
and driver_standings.raceid = races.raceid
join circuits
on races.cercuitid = circuits.cercuitid
join lap_times
on races.raceid = lap_times.raceid
and lap_times.driverid = drivers.driverid
join pit_stops
on lap_times.raceid = lap_times.raceid
and pit_stops.driverid = drivers.driverid
where (drivers.forename || ' ' || drivers.surname) = $1
group by races.raceid, drivers.driverid
order by races.date desc
`;

const getTopThreeOfEachYear = `
with race_stats as (
    select drivers.driverid, drivers.forename || ' ' || drivers.surname as driver, sum(driver_standings.wins) as total_wins, races.year
    from drivers
    join driver_standings
    on drivers.driverid = driver_standings.driverid
    join races
    on races.raceid = driver_standings.raceid
    group by drivers.driverid
    order by sum(driver_standings.wins) desc
)
SELECT rank_filter.* FROM (
    SELECT race_stats.*, 
    rank() OVER (
        PARTITION BY year
        ORDER BY rank_filter.total_wins DESC
    )
    FROM race_stats
) rank_filter WHERE RANK < 4
`;

module.export = {
    driversByIdQuery,
    driverById,
    driverByName,
    racesByDriverId,
    racesByDriverName,
    getTopThreeOfEachYear
};