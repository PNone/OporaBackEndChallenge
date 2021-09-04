CREATE TABLE CIRCUITS (
	circuitId integer PRIMARY KEY,
	circuitRef varchar(20) not null,
	name varchar(60) not null,
	location varchar(30) not null,
	country varchar(30) not null,
	lat float not null,
	lng float not null,
	alt integer not null,
	url varchar(200) not null
);

CREATE TABLE CONSTRUCTORS (
	constructorId integer PRIMARY KEY,
	constructorRef varchar(20) not null,
	name varchar(60) not null,
	nationality varchar(20) not null,
	url varchar(200) not null
);

CREATE TABLE DRIVERS (
	driverId integer PRIMARY KEY,
	driverRef varchar(20) not null,
	number smallint,
	code varchar(3),
	forename varchar(30) not null,
	surname varchar(30) not null,
	dob date not null,
	nationality varchar(20) not null,
	url varchar(200) not null
);

CREATE TABLE RACES (
	raceId integer PRIMARY KEY,
	year smallint not null,
	round smallint,
	circuitId integer,
	name varchar(60) not null,
	date date not null,
	time time without time zone,
	url varchar(200) not null,
	CONSTRAINT fk_circuit
		FOREIGN KEY (circuitId)
			REFERENCES CIRCUITS(circuitId)
);

CREATE TABLE CONSTRUCTOR_RESULTS (
	constructorResultsId integer PRIMARY KEY,
	raceId integer not null,
	constructorId integer not null,
	points smallint not null,
	status varchar(1),
	CONSTRAINT fk_race
		FOREIGN KEY (raceId)
			REFERENCES RACES(raceId),
	CONSTRAINT fk_constructor
		FOREIGN KEY (constructorId)
			REFERENCES CONSTRUCTORS(constructorId)
);

CREATE TABLE CONSTRUCTOR_STANDINGS (
	constructorStandingsId integer PRIMARY KEY,
	raceId integer not null,
	constructorId integer not null,
	points smallint not null,
	position smallint not null,
	positionText varchar(2) not null,
	wins smallint not null,
	CONSTRAINT fk_race
		FOREIGN KEY (raceId)
			REFERENCES RACES(raceId),
	CONSTRAINT fk_constructor
		FOREIGN KEY (constructorId)
			REFERENCES CONSTRUCTORS(constructorId)
);

CREATE TABLE DRIVER_STANDINGS (
	driverStandingsId integer PRIMARY KEY,
	raceId integer not null,
	driverId integer not null,
	points smallint not null,
	position smallint not null,
	positionText varchar(2) not null,
	wins smallint not null,
	CONSTRAINT fk_race
		FOREIGN KEY (raceId)
			REFERENCES RACES(raceId),
	CONSTRAINT fk_driver
		FOREIGN KEY (driverId)
			REFERENCES DRIVERS(driverId)
);

CREATE TABLE QUALIFYING (
	qualifyId integer PRIMARY KEY,
	raceId integer not null,
	driverId integer not null,
	constructorId integer not null,
	number smallint not null,
	position smallint not null,
	q1 time without time zone,
	q2 time without time zone,
	q3 time without time zone,
	CONSTRAINT fk_race
		FOREIGN KEY (raceId)
			REFERENCES RACES(raceId),
	CONSTRAINT fk_driver
		FOREIGN KEY (driverId)
			REFERENCES DRIVERS(driverId),
	CONSTRAINT fk_constructor
		FOREIGN KEY (constructorId)
			REFERENCES CONSTRUCTORS(constructorId)
);

CREATE TABLE PIT_STOPS (
	raceId integer not null,
	driverId integer not null,
	stop smallint not null,
	lap smallint not null,
	time time without time zone not null,
	duration time without time zone not null,
	milliseconds integer not null,
	PRIMARY KEY(raceId, driverId, stop),
	CONSTRAINT fk_race
		FOREIGN KEY (raceId)
			REFERENCES RACES(raceId),
	CONSTRAINT fk_driver
		FOREIGN KEY (driverId)
			REFERENCES DRIVERS(driverId)
);

CREATE TABLE LAP_TIMES (
	raceId integer not null,
	driverId integer not null,
	lap smallint not null,
	position smallint not null,
	time time without time zone not null,
	milliseconds integer not null,
	PRIMARY KEY(raceId, driverId, lap),
	CONSTRAINT fk_race
		FOREIGN KEY (raceId)
			REFERENCES RACES(raceId),
	CONSTRAINT fk_driver
		FOREIGN KEY (driverId)
			REFERENCES DRIVERS(driverId)
);

CREATE TABLE SEASONS (
	year integer PRIMARY KEY,
	url varchar(200) not null
);

CREATE TABLE STATUS (
	statusId integer PRIMARY KEY,
	status varchar(20) not null
);

CREATE TABLE RESULTS (
	resultId integer PRIMARY KEY,
	raceId integer not null,
	driverId integer not null,
	constructorId integer not null,
	number smallint,
	grid smallint not null,
	position smallint,
	positionText varchar(1) not null,
	positionOrder smallint not null,
	points smallint not null,
	laps smallint not null,
	time varchar(15) not null,
	milliseconds integer,
	fastestLap smallint,
	rank smallint,
	fastestLapTime time without time zone,
	fastestLapSpeed float,
	statusId integer not null,
	CONSTRAINT fk_race
		FOREIGN KEY (raceId)
			REFERENCES RACES(raceId),
	CONSTRAINT fk_driver
		FOREIGN KEY (driverId)
			REFERENCES DRIVERS(driverId),
	CONSTRAINT fk_constructor
		FOREIGN KEY (constructorId)
			REFERENCES CONSTRUCTORS(constructorId),
	CONSTRAINT fk_status
		FOREIGN KEY (statusId)
			REFERENCES STATUS(statusId)
);