<template>
    <div>
        <div class="container">
            <div class="row mt-5">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h3 class="card-title">Admin Table</h3>

                            <div class="card-tools">
                                <button class="btn btn-success" data-toggle="modal" data-target="#addNew" @click="newModal">
                                    Add New
                                    <i class="fas fa-user-plus fa-fw"></i>
                                </button>
                            </div>
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body">
                            <div id="example1_wrapper" class="dataTables_wrapper dt-bootstrap4">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                            <!-- /.card-header -->
                                            <div class="card-body table-responsive p-0">
                                                <table class="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th>ID</th>
                                                            <th>Username</th>
                                                            <th>Email</th>
                                                            <th>Type</th>
                                                            <th>Registered At</th>
                                                            <th>Modify</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="admin in admins" :key="admin.id">
                                                            <td>{{ admin.id }}</td>
                                                            <td>{{ admin.name }}</td>
                                                            <td>{{ admin.email }}</td>
                                                            <td>{{ admin.type | upText }}</td>
                                                            <td>{{ admin.created_at | myDate }}</td>
                                                            <td>
                                                                <a href="#" @click="editAdmin(admin)">
                                                                    <i class="fa fa-edit blue"></i>
                                                                </a>
                                                                /
                                                                <a href="#" @click="deleteAdmin(admin.id)">
                                                                    <i class="fa fa-trash red"></i>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                            <!-- /.card-body -->
                                        </div>
                                        <!-- /.card -->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>
                <!-- /.col -->
            </div>
            <!-- /.row -->
        </div>
        <!-- Modal -->
        <div class="modal fade" id="addNew" tabindex="-1" role="dialog" aria-labelledby="addNewLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" v-show="editmode" id="addNewLabel">Update Info</h5>
                        <h5 class="modal-title" v-show="!editmode" id="addNewLabel">Add New</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <!-- &times; means multiplication sign
                            ` -->
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form @submit.prevent="editmode ?  updateAdmin() : addAdmin()">
                        <div class="modal-body">
                            <div class="form-group">
                                <input
                                    v-model="form.name"
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Name"
                                    class="form-control"
                                    :class="{'is-invalid': form.errors.has('name')}"
                                />
                                <has-error :form="form" field="name"></has-error>
                            </div>

                            <div class="form-group">
                                <input
                                    v-model="form.email"
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="Email Address"
                                    class="form-control"
                                    :class="{'is-invalid': form.errors.has('email')}"
                                />
                                <has-error :form="form" field="email"></has-error>
                            </div>

                            <div class="form-group">
                                <textarea
                                    v-model="form.bio"
                                    type="bio"
                                    name="bio"
                                    id="bio"
                                    placeholder="Short bio for user (Optional)"
                                    class="form-control"
                                    :class="{'is-invalid': form.errors.has('bio')}"
                                >
                                </textarea>
                                <has-error :form="form" field="bio"></has-error>
                            </div>

                            <div class="form-group">
                                <select
                                    name="type"
                                    v-model="form.type"
                                    id="type"
                                    class="form-control"
                                    :class="{'is-invalid': form.errors.has('type')}"
                                >
                                    <option value="">Select User Role</option>
                                    <option value="superadmin">Super Admin</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <has-error :form="form" field="type"></has-error>
                            </div>

                            <div class="form-group">
                                <input
                                    v-model="form.password"
                                    type="password"
                                    name="password"
                                    id="password"
                                    class="form-control"
                                    :class="{'is-invalid': form.errors.has('password')}"
                                />
                                <has-error :form="form" field="password"></has-error>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-danger" data-dismiss="modal">
                                Close
                            </button>
                            <button v-show="editmode" type="submit" class="btn btn-primary">
                                Update 
                            </button>
                            <button v-show="!editmode" type="submit" class="btn btn-primary">
                                Create 
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            editmode: false,
            admins: {},
            form: new Form({
                id: "",
                name: "",
                email: "",
                password: "",
                type: "",
                bio: "",
                photo: ""
            })
        };
    },
    methods: {
        newModal(){
            this.editmode = false;
            this.form.reset();
            $("#addNew").modal("show");
        },
        updateAdmin(){
            this.$Progress.start();
            //console.log('editing adphpmin data');
            this.form.put('api/admin/' + this.form.id)
            .then(() => {
                $("#addNew").modal("hide");
                swal.fire(
                        "Updated!", 
                        "updated successfully", 
                        "success")
                        this.$Progress.finish();
                        Fire.$emit("AfterAdding");
            }) 
            .catch(() => {
                this.$Progress.fail();
            });
        },
        editAdmin(user){
            this.editmode = true;
            this.form.reset();
            $("#addNew").modal("show");
            this.form.fill(user)
        },
        deleteAdmin(id) {
            //swalWithBootstrapButtons
            swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                //'No, cancel!'
                cancelButtonText: "cancel",
                confirmButtonText: "Yes, delete it!"
                //,reverseButtons: false but this function is not necessary because it's default might search for future references
            }).then(result => {
                //send request to the server

                //swalWithBootstrapButtons
                if (result.value) {
                    this.form.delete("api/admin/" + id)
                        .then(() => {
                            swal.fire(
                                "Deleted!", 
                                "deleted successfully", 
                                "success")
                            Fire.$emit("AfterAdding");
                        })
                        .catch(() => {
                            swal.fire(
                                "Failed!",
                                "There was something wrong.",
                                "warning"
                            );    
                        });
                } else if (result.dismiss === swal.DismissReason.cancel) {
                    //swalWithBootstrapButtons
                    swal.fire(
                        "Cancelled", 
                        "admin delete cancelled", 
                        "error");
                }

              
            });
        },
        loadAdmins() {
            //es6
            axios
                .get("api/admin")
                .then(({ data }) => (this.admins = data.data));
        },
        addAdmin() {
            this.$Progress.start();

            this.form
                .post("api/admin")
                .then(() => {
                    Fire.$emit("AfterAdding");

                    $("#addNew").modal("hide");

                    toast.fire({
                        icon: "success",
                        title: "Admin Added Successfully"
                    });
                    this.$Progress.finish();
                })
                .catch(() => {});
        }
    },
    created() {
        this.loadAdmins();
        Fire.$on("AfterAdding", () => {
            this.loadAdmins();
        });
        //performance issue because the user is not doing anythng yet the system keep on sending request
        //setInterval(() => this.loadAdmins(), 3000)
    }
};
</script>
