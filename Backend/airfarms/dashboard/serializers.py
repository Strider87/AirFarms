from django.db.models.query import QuerySet
from rest_framework import serializers
from .models import CommentPicture, Post, Comments
from accounts.models import User

class CreatePostSerializer(serializers.ModelSerializer):
    
    user = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = (
            'description',
            #'pic',
            'date_posted',
            'tags',
            'user'
        )
        extra_kwargs = {'date_posted': {'write_only': True}}

    def __init__(self, *args, **kwargs):
        post_user = kwargs.pop('user')
        super(CreatePostSerializer, self).__init__(*args, **kwargs)
        if post_user:
            self.fields['user'].queryset = User.objects.filter(id=post_user.id)

    # Create new post
    def create(self, validated_data):
        post = Post(
            description = validated_data['description'],
            #pic = validated_data['pic'],
            date_posted = validated_data['date_posted'],
            tags = validated_data['tags'],
            user = self.fields['user'].queryset.get(),
        )
        post.save()
        return post
    
    def validate(self, data):
        user = self.fields['user'].queryset.get()
        if user and user.is_active:
            return data        
        raise serializers.ValidationError("Invalid Details.")

class UpdatePostSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField()
    
    class Meta:
        model = Post
        fields = (
            'description',
            #'pic',
            #'date_posted',
            'tags',
            'user'
        )
        #extra_kwargs = {'date_posted': {'write_only': True}}

    def __init__(self, *args, **kwargs):
        post_user = kwargs.pop('user')
        super().__init__(*args, **kwargs)
        if post_user:
            self.fields['user'].queryset = User.objects.filter(id=post_user.id)    
    
    def validate(self, data):
        user = self.fields['user'].queryset.get()
        if user and user.is_active:
            return data        
        raise serializers.ValidationError("Invalid Details.")

class PostSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()    
    class Meta:
        model = Post
        fields = ('id', 'description', 'pic', 'date_posted', 'tags')

    def validate(self, data):
        post = Post.objects.get(id=int(data['id']))
        if post:
            return post
        raise serializers.ValidationError("Invalid Details.")

class CreateCommentSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    post = serializers.SerializerMethodField()
    class Meta:
        model = Comments
        fields = (
            'comment',
            'comment_date',
            #'pic',
            'post',
            'user'
        )
        extra_kwargs = {'comment_date': {'write_only': True}}
    
    def __init__(self, *args, **kwargs):
        comment_user = kwargs.pop('user')
        post = kwargs.pop('post')
        super().__init__(*args, **kwargs)
        #super(CreatePostSerializer, self).__init__(*args, **kwargs)
        if comment_user:
            self.fields['user'].queryset = User.objects.filter(id=comment_user.id)
            self.fields['post'].queryset = Post.objects.filter(id=post.id)
    
    # Create new comment
    def create(self, validated_data):
        #master_post = Post.objects.filter(id=int(validated_data['post']))
        
        comment = Comments(
            comment = validated_data['comment'],
            #pic = validated_data['pic'],
            comment_date = validated_data['comment_date'],
            post = self.fields['post'].queryset.get(),#master_post,
            user = self.fields['user'].queryset.get(),

        )
        comment.save()
        return comment
            #self.fields['post'].queryset = Post.objects.filter(id=self.post)

    def validate(self, data):
            user = self.fields['user'].queryset.get()
            post = self.fields['post'].queryset.get()
            if post and user and user.is_active:
                return data        
            raise serializers.ValidationError("Invalid Details.")

class CommentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()    
    class Meta:
        model = Comments
        fields = ('id', 'comment', 'pic', 'comment_date')

    def validate(self, data):
        comment = Comments.objects.get(post=int(data['id']))
        if comment:
            return comment
        raise serializers.ValidationError("Invalid Details.")

class CommentListSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()
    post = serializers.SerializerMethodField()    
    class Meta:
        model = Comments
        fields = ('user', 'post')

    def __init__(self, *args, **kwargs):
        comment_user = kwargs.pop('user')
        post = kwargs.pop('post')
        super().__init__(*args, **kwargs)
        #super(CreatePostSerializer, self).__init__(*args, **kwargs)
        if comment_user:
            self.fields['user'].queryset = User.objects.filter(id=comment_user.id)
            self.fields['post'].queryset = Post.objects.filter(id=post.id)
    
    def validate(self, data):
        comments = Comments.objects.filter(post=self.fields['post'].queryset.get())
        if comments:
            return comments
        raise serializers.ValidationError("Invalid Details.")


class UpdateCommentSerializer(serializers.ModelSerializer):

    user = serializers.SerializerMethodField()
    post = serializers.SerializerMethodField()
    class Meta:
        model = Comments
        fields = (
            'comment',
            #'pic',
            #'date_posted',
            'post',
            'user'
        )
        #extra_kwargs = {'date_posted': {'write_only': True}}

    def __init__(self, *args, **kwargs):
        comment_user = kwargs.pop('user')
        post = kwargs.pop('post')
        super().__init__(*args, **kwargs)
        if comment_user:
            self.fields['user'].queryset = User.objects.filter(id=comment_user.id) 
            self.fields['post'].queryset = Post.objects.filter(id=post.id)   
    
    def validate(self, data):
        user = self.fields['user'].queryset.get()
        post = self.fields['post'].queryset.get()
        if post and user and user.is_active:
            return data        
        raise serializers.ValidationError("Invalid Details.")

class CommentPictureSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentPicture
        fields = ('comment', 'pic', 'id')

    # Create new comment
    # def create(self, validated_data):
    #     #master_post = Post.objects.filter(id=int(validated_data['post']))
        
    #     commentPic = CommentPicture(
    #         comment = validated_data['comment'],
    #         pic = self.context.get('view').request.FILES,
    #     )
    #     commentPic.save()
    #     return commentPic