<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <section class="content">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-3">
                                <!-- Profile Image -->
                                <div class="card card-primary card-outline">
                                    <div class="card-body box-profile">
                                        <div class="text-center">
                                            <img  class="profile-user-img img-fluid img-circle" :src="getProfilePhoto()" alt="User profile picture"/>
                                        </div>

                                        <h3 class="profile-username text-center">{{this.form.name}}</h3>

                                        <p class="text-muted text-center">{{this.form.bio}}</p>
                                    </div>
                                    <!-- /.card-body -->
                                </div>
                                <!-- /.card -->

                                <!-- About Me Box -->
                                <div class="card card-primary">
                                    <div class="card-header">
                                        <h3 class="card-title">About Me</h3>
                                    </div>
                                    <!-- /.card-header -->
                                    <div class="card-body">
                                        <strong><i class="fas fa-book mr-1"></i>Education</strong>

                                        <p class="text-muted">B.S. in Computer Science from the University of Tennessee at Knoxville</p>

                                        <hr />

                                        <strong><i class="fas fa-map-marker-alt mr-1"></i>Location</strong>

                                        <p class="text-muted">Malibu, California</p>

                                        <hr />

                                        <strong><i class="fas fa-pencil-alt mr-1"></i>Skills</strong>

                                        <p class="text-muted">
                                            <span class="tag tag-danger">UI Design</span>
                                            <span class="tag tag-success">Coding</span>
                                            <span class="tag tag-info">Javascript</span>
                                            <span class="tag tag-warning">PHP</span>
                                            <span class="tag tag-primary">Node.js</span>
                                        </p>
                                    </div>
                                    <!-- /.card-body -->
                                </div>
                                <!-- /.card -->
                            </div>
                            <!-- /.col -->
                            <div class="col-md-9">
                                <div class="card">
                                    <div class="card-header p-2">
                                        <h3 class="card-title">Settings</h3>
                                    </div>
                                    <!-- /.card-header -->
                                    <div class="card-body">
                                                <form class="form-horizontal">
                                                    <div class="form-group row">
                                                        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                                                        <div class="col-sm-10">
                                                            <input v-model="form.name" type="name" class="form-control" id="inputName" placeholder="Name" :class="{'is-invalid':form.errors.has('name')}"/>
                                                            <has-error :form="form" field="name"></has-error>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                                                        <div class="col-sm-10">
                                                            <input v-model="form.email" type="email" class="form-control" id="inputEmail" placeholder="Email"  :class="{'is-invalid':form.errors.has('email')}"/>
                                                            <has-error :form="form" field="email"></has-error>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="inputPassword" class="col-sm-2 col-form-label">Password</label>
                                                        <div class="col-sm-10">
                                                            <input v-model="form.password" type="password" class="form-control" id="inputPassword" placeholder="Password"  :class="{'is-invalid':form.errors.has('password')}"/>
                                                            <has-error :form="form" field="password"></has-error>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="inputBio" class="col-sm-2 col-form-label">Bio</label>
                                                        <div class="col-sm-10">
                                                            <textarea v-model="form.bio" class="form-control" id="inputBio" placeholder="Bio"></textarea>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <label for="inputPhoto" class="col-sm-2 col-form-label">Profile Photo</label>
                                                        <div class="col-sm-10">
                                                            <input type="file" @change="updateProfile" class="form-input"  name="photo"/>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <div class="offset-sm-2 col-sm-10">
                                                            <button @click.prevent="updateInfo" type="submit" class="btn btn-success">
                                                                update
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
                                        <!-- /.tab-content -->
                                    </div>
                                    <!-- /.card-body -->
                                </div>
                                <!-- /.nav-tabs-custom -->
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                    </div>
                    <!-- /.container-fluid -->
                </section>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            form: new Form({
                id: "",
                name: "",
                email: "",
                password: "",
                type: "",
                bio: "",
                photo: ""
            })
        }
    },
    mounted() {
        console.log("Component mounted.");
    },
    methods : {
        getProfilePhoto(){
            let prefix = (this.form.photo.match(/\//) ? '' : '/img/profile/');
            return prefix + this.form.photo;
        },
        updateInfo(){
            this.$Progress.start();
            this.form.put('api/profile')
            .then(() => {
                swal.fire(
                        "Updated!", 
                        "updated successfully", 
                        "success")
                Fire.$emit('AfterCreate');
                this.$Progress.finish();
            })
            .catch(()=>{
                this.$Progress.fail();
            });
        },
        updateProfile(e){
            //console.log('uploading');

            let file = e.target.files[0];
            console.log(file);
            let reader = new FileReader();
            //condition for limiting the photo into 2mb
            if(file['size'] < 2111775){
                reader.onloadend =  (file) => {
                //console.log('RESULT', reader.result)
                this.form.photo = reader.result;
            }
            
            reader.readAsDataURL(file);
            }else{
                 swal.fire({
                        type: "error", 
                        title: "Oops. . .", 
                        text: "You are uploading a large file"
                        })
            }
            

        }
    },
    created(){
        axios.get('api/profile')
        .then(({data}) => (this.form.fill(data)));
    }
};
</script>
