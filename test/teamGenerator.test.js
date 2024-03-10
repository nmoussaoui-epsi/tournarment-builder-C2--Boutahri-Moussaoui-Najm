import { expect } from "chai";
import TeamGenerator from "../src/teamGenerator.js";

describe("TeamGenerator", () => {
  describe("constructor", () => {
    it("should create a TeamGenerator instance", () => {
      const teamGenerator = new TeamGenerator(["Player1", "Player2", "Player3"], 2);
      expect(teamGenerator).to.be.an.instanceOf(TeamGenerator);
    });

    it("should set players and playersPerTeam correctly", () => {
      const players = ["Player1", "Player2", "Player3"];
      const teamGenerator = new TeamGenerator(players, 2);
      expect(teamGenerator.players).to.deep.equal(players);
      expect(teamGenerator.playersPerTeam).to.equal(2);
    });
  });

  describe("generateTeams", () => {
    it("should generate teams with correct number of players per team", () => {
      const players = ["Player1", "Player2", "Player3", "Player4", "Player5", "Player6"];
      const teamGenerator = new TeamGenerator(players, 2);
      teamGenerator.generateTeams();
      expect(teamGenerator.teams).to.have.lengthOf(3);
      expect(teamGenerator.teams[0].players).to.have.lengthOf(2);
    });
  });

  describe("getTeams", () => {
    it("should return the generated teams", () => {
      const players = ["Player1", "Player2", "Player3", "Player4"];
      const teamGenerator = new TeamGenerator(players, 2);
      teamGenerator.generateTeams();
      expect(teamGenerator.getTeams()).to.deep.equal(teamGenerator.teams);
    });
  });

  describe("More tests", () => {
    it("should not have any player in multiple teams", () => {
      const players = ["Player1", "Player2", "Player3", "Player4", "Player5", "Player6"];
      const teamGenerator = new TeamGenerator(players, 2);
      teamGenerator.generateTeams();
      const allPlayers = teamGenerator.teams.reduce((acc, team) => [...acc, ...team.players], []);
      const uniquePlayers = new Set(allPlayers);
      expect(allPlayers).to.have.lengthOf(uniquePlayers.size);
    });

    it("should handle empty player list", () => {
      const players = [];
      const teamGenerator = new TeamGenerator(players, 2);
      expect(() => teamGenerator.generateTeams()).to.not.throw();
      expect(teamGenerator.teams).to.have.lengthOf(0);
    });

    it("should handle odd number of players", () => {
      const players = ["Player1", "Player2", "Player3", "Player4", "Player5"];
      const teamGenerator = new TeamGenerator(players, 2);
      teamGenerator.generateTeams();
      expect(teamGenerator.teams).to.have.lengthOf(3);
      expect(teamGenerator.teams[2].players).to.have.lengthOf(1);
    });
  });
});
