// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract CampaignFactory {
    // instance variables
    address[] public deployedCampaigns;
    mapping(address => address) public lastCampaignMap;

    // methods
    function createCampaign(uint256 minimum) public {
        address newCampaign = address(new Campaign(minimum, msg.sender));
        deployedCampaigns.push(newCampaign);
        lastCampaignMap[msg.sender] = newCampaign;
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }

    function getLastCampaign(address owner) public view returns (address) {
        return lastCampaignMap[owner];
    }
}

contract Campaign {
    // structs
    struct Request {
        uint256 value;
        address recipient;
        bool complete;
        uint256 approvalCount;
        mapping(address => bool) approvals;
    }

    // instance variables
    mapping(address => bool) public contributors;
    address public manager;
    uint256 public minimumContribution;
    uint256 public numContributors;
    Request[] public requests;

    // modifiers
    modifier managerOnly() {
        require(msg.sender == manager);
        _;
    }

    // constructor
    constructor(uint256 minimum, address creator) {
        manager = creator;
        minimumContribution = minimum;
        numContributors = 0;
    }

    // methods
    function approveRequest(uint256 index) public {
        Request storage request = requests[index];

        require(contributors[msg.sender]);
        require(!request.approvals[msg.sender]);

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function contribute() public payable {
        require(msg.value >= minimumContribution);

        contributors[msg.sender] = true;
        numContributors++;
    }

    function createRequest(uint256 value, address recipient)
        public
        managerOnly
    {
        require(address(this).balance >= value);

        Request storage request = requests.push();
        request.value = value;
        request.recipient = recipient;
        request.complete = false;
        request.approvalCount = 0;
    }

    function finalizeRequest(uint256 index) public payable managerOnly {
        Request storage request = requests[index];

        require(!request.complete);
        require(address(this).balance >= request.value);
        require(request.approvalCount >= (numContributors / 2));

        payable(request.recipient).transfer(request.value);

        request.complete = true;
    }

    function getRequestCount() public view returns (uint256) {
        return requests.length;
    }

    function getSummary()
        public
        view
        returns (
            address,
            uint256,
            uint256,
            uint256,
            uint256
        )
    {
        return (
            manager,
            address(this).balance,
            minimumContribution,
            requests.length,
            numContributors
        );
    }

    function isApprover(address contributor, uint256 index)
        public
        view
        returns (bool)
    {
        require(contributors[contributor]);

        Request storage request = requests[index];
        return request.approvals[contributor];
    }

    function isContributor(address contributor) public view returns (bool) {
        return contributors[contributor];
    }
}
