pragma solidity ^0.4.14;

contract Vote {
    struct CandidateEntity {
        bytes32 name;
        uint votes;
        // Can add more information here
    }
    mapping (bytes32 => CandidateEntity) voteCount;
    bytes32[] candidateNames;
    mapping (address => uint) senderVotes;
    address owner;
    uint numOfVoters;

    function Vote(bytes32[] _candidateNames) {
        candidateNames = _candidateNames;
        owner = msg.sender;
    }

    // modifier isValidCandidate(bytes32 candidate) {
    //     for (uint i = 0; i < candidateNames.length; i++) {
    //         if (sha3(candidateNames[i]) == sha3(candidate)) {
    //            _; 
    //         }
    //     }
    // }

    // Sender, Candidate, candidate votes, total votes
    event Voted(address, bytes32, uint, uint);

    // To vote for a candidate
    // function voteCandidate(bytes32 candidate) isValidCandidate(candidate) public {
    function voteCandidate(bytes32 candidate) public {
        voteCount[candidate].votes += 1;
        voteCount[candidate].name = candidate;
        senderVotes[msg.sender] += 1;
        numOfVoters += 1;
        Voted(msg.sender, voteCount[candidate].name, voteCount[candidate].votes, numOfVoters);
    }

    modifier isOwner {
        require(msg.sender == owner);
        _;
    }

    function getSenderVoteCount() constant returns (uint) {
        return senderVotes[msg.sender];
    }

    function getCandidateVotes(bytes32 candidate) isOwner constant returns (bytes32, uint) {
        return (voteCount[candidate].name, voteCount[candidate].votes);
    }

    function getCandidateCount() constant returns (uint) {
        return candidateNames.length;
    }

    function getNumOfVoters() constant returns (uint) {
        return numOfVoters;
    }
}