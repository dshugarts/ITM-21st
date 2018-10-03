const app = angular.module("Candidate.App", []);


app.component("itmRoot", {
    controller: class {
        constructor() {
             this.candidates = [{ name: "Puppies", color: "Silver", description: "Silver Lab", votes: 10, percent: 0+"%" }, { name: "Kittens", color: "Orange", description: "Tabby Cat", votes: 12, percent: 0+"%" }, { name: "Gerbils", color: "White", description: "White Gerbil", votes: 7, percent: 0+"%" }];
             
             this.calcPercentage = function() {
                let voteSum = 0;
               
                this.candidates.forEach(function(existingCandidate) {
                    voteSum = existingCandidate.votes + voteSum;
                }) // creates total sum of votes

                this.candidates.forEach(function(existingCandidate) {
                    existingCandidate.percent = Math.round((existingCandidate.votes/voteSum)*100)+"%";
                }) // calculates and rounds percentage for each object
            } // end calcPercentage

            this.calcPercentage();

            }

        // adds vote onClick for selected object
        onVote(candidate) {
            let addVote = candidate.votes + 1
            candidate.votes = addVote;
            this.calcPercentage();
        } // end onVote

        onAddCandidate(candidate) {
            let duplicate = false;

            candidate = {
                name: candidate.name,
                color: candidate.color,
                description: candidate.description,
                votes: 0,
                percent: 0+"%"
            } // defines new candidate object

            // validates input
            this.validation = function(duplicate) {
                if (candidate.name === '') {
                    swal("Error!", "Please Enter a Candidate Name!", "error");
                } else if (duplicate === true) {
                    swal("Error!", "Duplicate candidates are forbidden!", "error");
                } else {
                    swal("Success!", "The candidate has been created!", "success");
                    this.candidates.push(candidate);
              }
            } // end validation
           
            this.candidates.forEach(function(existingCandidate) {
                if (candidate.name === existingCandidate.name) {
                    duplicate = true;
                   // location.reload();
                } else {
                  //  duplicate = false;
                }
                }); // checks input for duplicate candidates

                this.validation(duplicate);
        } // end onAddCandidate

        onRemoveCandidate(candidate) {
            // splices object from array
            this.removeCandidate = function(object) {
                this.candidates.splice(object, 1);
            } // end removeCandidate

            // identifies index of selected object
            var candidateArray = this.candidates;
            const removedObject = candidateArray.findIndex(selected => selected.name === candidate.name);
            this.removeCandidate(removedObject);
        } // end onRemoveCandidate

    },
    template: `
    <div id="instructions">
    <div id="header">
        <h1 class="lead">Candidate Poll</h1>
    </div>
</div>
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
    }


        submitCandidate(candidate) {
            this.onAdd({ $candidate: candidate });

             // clears textbox on click
             this.clearText = function() {
                this.newCandidate.name = "";
                this.newCandidate.color = "";
                this.newCandidate.description = "";
            } //end clearText

            this.clearText();
        }
        
        removeCandidate(candidate) {
            this.onRemove({ $candidate: candidate });
            swal("Success!", "The candidate has been deleted!", "success");
            } // end removeCandidate

    },
    template: `
        <div id="manage">
        <h1>Manage Candidates</h1>
        </div>

        <section class="container2">
        <h3>Add New Candidate</h3>
        <div class="container">
        <form class="col-md-12" ng-submit="$ctrl.submitCandidate($ctrl.newCandidate)" novalidate>
    
            <div class="form-group col-md-8">
            <label><strong>Candidate Name: </strong></label>
            <input type="text" ng-model="$ctrl.newCandidate.name" required>
            </div>

            <div class="form-group col-md-8">
            <label><strong>Candidate Color: </strong></label>
            <input type="text" ng-model="$ctrl.newCandidate.color">
            </div>

            <div class="form-group col-md-8">
            <label><strong>Candidate Description: </strong></label>
            <input type="text" ng-model="$ctrl.newCandidate.description">
            </div>
        
            <div class="form-group col-md-8">
            <button type="submit" class="btn btn-success">Create</button>
            </div>

        </form>
        </div>
        </section>

        <section class="container2">
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
        </section>

    `
});

app.component("itmVote", {
    bindings: {
        candidates: "<",
        onVote: "&"
    },
    controller: class {},
    template: `
    <section class="container2">
        <h3>Cast your vote!</h3>
        <div class="container2">
        <button type="button" class="btn btn-outline-info col-sm-2"
            ng-repeat="candidate in $ctrl.candidates"
            ng-click="$ctrl.onVote({ $candidate: candidate })">
            <span ng-bind="candidate.name"></span>
        </button>
        </div>
        </section>
    `
});

app.component("itmResults", {
    bindings: {
        candidates: "<"
    },
    controller: class {},
    template: `
    <section class="container2">
        <h3>Live Results</h3>
        <div class="container">
        <div class="table-responsive-sm">
        <table class="table table-hover">
        <thead>
        <tr class="table-primary">
          <th>Candidate Name</th>
          <th>Color</th>
          <th>Description</th>
          <th>Number of Votes</th>
          <th>Percentage of Votes</th>
        </tr>
      </thead>

      <tbody ng-repeat="candidate in $ctrl.candidates | orderBy: '-votes'">
      <tr>
        <td>{{candidate.name}}</td>
        <td>{{candidate.color}}</td>
        <td>{{candidate.description}}</td>
        <td>{{candidate.votes}}</td>
        <td>{{candidate.percent}}</td>
    </tbody>
    </table>
        </div>
        </div>
        </section>
    `
});