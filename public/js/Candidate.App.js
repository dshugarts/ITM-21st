const app = angular.module("Candidate.App", []);


app.component("itmRoot", {
    controller: class {
        constructor() {
             this.candidates = [{ name: "Puppies", votes: 10, percent: 0+"%" }, { name: "Kittens", votes: 12, percent: 0+"%" }, { name: "Gerbils", votes: 7, percent: 0+"%" }];
             
             this.calcPercent = function() {
                 let voteSum = 0;
                console.log('in calc percent OLD', this.candidates);
               
                this.candidates.forEach(function(existingCandidate) {
                    
                    console.log('forEach = ', existingCandidate);
                    voteSum = existingCandidate.votes + voteSum;
                    
                })
                console.log(voteSum);
                this.candidates.forEach(function(existingCandidate) {
                    
                    
                    existingCandidate.percent = Math.round((existingCandidate.votes/voteSum)*100)+"%";
                    console.log('forEach = ', existingCandidate);
                    
                })
            }

            this.calcPercent();
            }
        onVote(candidate) {
            console.log(`Vote for ${candidate.name}`);
            console.log(candidate.votes);
            let newVote = candidate.votes + 1
            console.log(newVote);
            candidate.votes = newVote;
            console.log(this.candidates);
            this.calcPercent();
        }

        onAddCandidate(candidate) {
            console.log(`Added candidate ${candidate.name}`);
         
        }

        onRemoveCandidate(candidate) {
            console.log(`Removed candidate ${candidate.name}`);
            this.newCandidates = function(object) {
                console.log('array = ', object);
                console.log('old', this.candidates);
                this.candidates.splice(object, 1);
                console.log('new', this.candidates);
            }
            console.log('remove', candidate);
            var words = this.candidates;
            console.log('words', words);
            const result = words.findIndex(word => word.name === candidate.name);
            console.log('result', result);
            this.newCandidates(result);
        }

    },
    template: `
    <div class="container2">
        <h1>Which candidate brings the most joy?</h1>
             
        <itm-results 
            candidates="$ctrl.candidates">
        </itm-results>

        <itm-vote 
            candidates="$ctrl.candidates"
            on-vote="$ctrl.onVote($candidate)">
        </itm-vote>

        <itm-management 
            candidates="$ctrl.candidates"
            on-add="$ctrl.onAddCandidate($candidate)"
            on-remove="$ctrl.onRemoveCandidate($candidate)">
        </itm-management>
        </div>
    `
});

app.component("itmManagement", {
    bindings: {
        candidates: "<",
        onAdd: "&",
        onRemove: "&"
    },
    controller: class {
        constructor($http, $scope) {
            this.$http = $http;
            this.$scope = $scope;
            this.newCandidate = {
                name: ""
            };

            console.log('in Management');

    }

        submitCandidate(candidate) {
            let self = this;
            self.cleartext = function() {
                this.newCandidate.name = "";
            }
            console.log('name = ', candidate);
            candidate = {
                name: candidate.name,
                votes: 0,
                percent: 0+"%"
            }
            console.log('name 2= ', candidate);
           
            self.validation = function() {
                console.log('in valid');
                if (candidate.name === '') {
                    alert("Please Enter a Candidate Name");
                    self.cleartext();
                } else {
                    console.log('double');
                    this.onAdd({ $candidate: candidate })
                    this.candidates.push(candidate);
                    self.cleartext();
              }
            }
           
            this.candidates.forEach(function(existingCandidate) {
                let duplicate = false;
                console.log('forEach = ', existingCandidate);
                if (candidate.name === existingCandidate.name) {
                    duplicate = true;
                    alert("Duplicate");
                    location.reload();
                } else {
                    duplicate = false;
                }
                console.log('duplicate', duplicate);
                });
                self.validation();
        }
        
        
        
        
        
        removeCandidate(candidate) {
            this.onRemove({ $candidate: candidate });
         
            }
    },
    template: `
        <div id="manage">
        <h1>Manage Candidates</h1>
        </div>

        <div class="container2">
        <h3>Add New Candidate</h3>
        <div class="container">
        <form class="col-ml-12" ng-submit="$ctrl.submitCandidate($ctrl.newCandidate)" novalidate>

            <label><strong>Candidate Name: </strong></label>
            <input type="text" ng-model="$ctrl.newCandidate.name" required>

            <button type="submit" class="btn btn-success">Create</button>
        </form>
        </div>
        </div>

        <div class="container2">
        <h3>Remove Candidate</h3>
        <div class="container">
        <table class="table table-hover">
        <thead>
        <tr class="table-primary">
          <th>Candidate Name</th>
          <th>Remove Candidate</th>
        </tr>
      </thead>

      <tbody ng-repeat="candidate in $ctrl.candidates">
      <tr>
        <td>{{candidate.name}}</td>
        <td><button type="button" class="btn btn-danger" ng-click="$ctrl.removeCandidate(candidate)">Delete</button></td>
    </tbody>
    </table>
        </div>
        </div>

    `
});

app.component("itmVote", {
    bindings: {
        candidates: "<",
        onVote: "&"
    },
    controller: class {},
    template: `
    <div class="container2">
        <h3>Cast your vote!</h3>
        <div class="container2">
        <button type="button" class="btn btn-info col-sm-2"
            ng-repeat="candidate in $ctrl.candidates"
            ng-click="$ctrl.onVote({ $candidate: candidate })">
            <span ng-bind="candidate.name"></span>
        </button>
        </div>
        </div>
    `
});

app.component("itmResults", {
    bindings: {
        candidates: "<"
    },
    controller: class {},
    template: `
    <div class="container2">
        <h3>Live Results</h3>
        <div class="container">
        <table class="table table-hover">
        <thead>
        <tr class="table-primary">
          <th>Candidate Name</th>
          <th>Number of Votes</th>
          <th>Percentage of Votes</th>
        </tr>
      </thead>

      <tbody ng-repeat="candidate in $ctrl.candidates | orderBy: '-votes'">
      <tr>
        <td>{{candidate.name}}</td>
        <td>{{candidate.votes}}</td>
        <td>{{candidate.percent}}</td>
    </tbody>
    </table>
        </div>
        </div>
    `

});

// }]);