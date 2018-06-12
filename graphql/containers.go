package graphql

import (
	"github.com/dominik-zeglen/ecoknow/core"
	"github.com/globalsign/mgo/bson"
)

// Type resolvers
type containerResolver struct {
	dataSource core.Adapter
	data       *core.Container
}

func (res *containerResolver) Id() string {
	return toGlobalID("container", res.data.ID)
}
func (res *containerResolver) Name() string {
	return res.data.Name
}
func (res *containerResolver) Parent() *containerResolver {
	if res.data.ParentID == "" {
		return nil
	}
	parent, err := res.dataSource.GetContainer(res.data.ParentID)
	if err != nil {
		panic(err)
	}
	return &containerResolver{
		dataSource: res.dataSource,
		data:       &parent,
	}
}
func (res *containerResolver) Children() *[]*containerResolver {
	var resolverList []*containerResolver
	containers, err := res.dataSource.GetContainerChildrenList(res.data.ID)
	if err != nil {
		panic(err)
	}
	for index := range containers {
		resolverList = append(
			resolverList,
			&containerResolver{
				dataSource: res.dataSource,
				data:       &containers[index],
			},
		)
	}
	return &resolverList
}

type containerAddInput struct {
	Name     string
	ParentID *string
}
type createContainerArgs struct {
	Input containerAddInput
}

func (res *Resolver) CreateContainer(args createContainerArgs) *containerResolver {
	var container core.Container
	input := args.Input
	if input.ParentID != nil {
		parentID, err := fromGlobalID("container", *input.ParentID)
		if err != nil {
			return nil
		}
		container = core.Container{
			Name:     input.Name,
			ParentID: parentID,
		}
	} else {
		container = core.Container{
			Name: input.Name,
		}
	}
	container, err := res.dataSource.AddContainer(container)
	if err != nil {
		panic(err)
	}
	return &containerResolver{
		dataSource: res.dataSource,
		data:       &container,
	}
}

func (res *Resolver) GetContainer(args struct{ Id string }) *containerResolver {
	container, err := res.dataSource.GetContainer(bson.ObjectId(args.Id))
	if err != nil {
		panic(err)
	}
	return &containerResolver{
		dataSource: res.dataSource,
		data:       &container,
	}
}

func (res *Resolver) GetContainers() *[]*containerResolver {
	var resolverList []*containerResolver
	containers, err := res.dataSource.GetContainerList()
	if err != nil {
		panic(err)
	}
	for index := range containers {
		resolverList = append(
			resolverList,
			&containerResolver{
				dataSource: res.dataSource,
				data:       &containers[index],
			},
		)
	}
	return &resolverList
}

func (res *Resolver) GetRootContainers() *[]*containerResolver {
	var resolverList []*containerResolver
	containers, err := res.dataSource.GetRootContainerList()
	if err != nil {
		panic(err)
	}
	for index := range containers {
		resolverList = append(
			resolverList,
			&containerResolver{
				dataSource: res.dataSource,
				data:       &containers[index],
			},
		)
	}
	return &resolverList
}

type removeContainerArgs struct {
	Id string
}

func (res *Resolver) RemoveContainer(args removeContainerArgs) (bool, error) {
	localID, err := fromGlobalID("container", args.Id)
	if err != nil {
		return false, err
	}
	err = res.dataSource.RemoveContainer(localID)
	if err != nil {
		return false, err
	}
	return true, nil
}
